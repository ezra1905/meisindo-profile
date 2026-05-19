import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import seedNews from "@/data/news.json";

export type NewsStatus = "draft" | "published";

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  status: NewsStatus;
  updatedAt: string;
};

type NewsPayload = Record<string, unknown>;

type NewsRow = {
  id: unknown;
  slug: unknown;
  title: unknown;
  excerpt: unknown;
  content: unknown;
  category: unknown;
  image: unknown;
  publishedAt: unknown;
  status: unknown;
  updatedAt: unknown;
};

export class NewsValidationError extends Error {}

export class NewsNotFoundError extends Error {}

export const fallbackNewsImage = "/Hero.png";

const localDatabaseUrl = "file:./data/meisindo-dev.db";

let client: Client | null = null;
let setupPromise: Promise<void> | null = null;

function isRecord(value: unknown): value is NewsPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function toStatus(value: unknown): NewsStatus {
  return value === "draft" ? "draft" : "published";
}

function toIsoDate(value: unknown, fallback = new Date().toISOString()) {
  const text = toText(value);
  if (!text) {
    return fallback;
  }

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function toImagePath(value: unknown) {
  const image = toText(value);
  return image.startsWith("/") ? image : fallbackNewsImage;
}

function summarizeContent(content: string) {
  return content.replace(/\s+/g, " ").slice(0, 170).trim();
}

function normalizeArticle(value: unknown): NewsArticle | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = toText(value.title);
  const content = toText(value.content);

  if (!title || !content) {
    return null;
  }

  const id = toText(value.id, randomUUID());
  const slug = slugify(toText(value.slug, title));
  const publishedAt = toIsoDate(value.publishedAt);

  return {
    id,
    slug,
    title,
    excerpt: toText(value.excerpt, summarizeContent(content)),
    content,
    category: toText(value.category, "Company News"),
    image: toImagePath(value.image),
    publishedAt,
    status: toStatus(value.status),
    updatedAt: toIsoDate(value.updatedAt, publishedAt),
  };
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);

  return slug || "berita";
}

function getDatabaseUrl() {
  const url = process.env.TURSO_DATABASE_URL || process.env.NEWS_DATABASE_URL;

  if (url) {
    return url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "TURSO_DATABASE_URL is required in production for news storage.",
    );
  }

  mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  return localDatabaseUrl;
}

function isRemoteDatabase(url: string) {
  return url.startsWith("libsql://") || url.startsWith("https://");
}

function getRawClient() {
  if (client) {
    return client;
  }

  const url = getDatabaseUrl();
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (isRemoteDatabase(url) && !authToken) {
    throw new Error("TURSO_AUTH_TOKEN is required for a remote Turso database.");
  }

  client = createClient({
    url,
    authToken,
  });

  return client;
}

async function getDatabase() {
  const db = getRawClient();

  if (!setupPromise) {
    setupPromise = setupDatabase(db);
  }

  await setupPromise;
  return db;
}

async function setupDatabase(db: Client) {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS news (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'Company News',
      image TEXT NOT NULL DEFAULT '${fallbackNewsImage}',
      published_at TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
      updated_at TEXT NOT NULL
    )
  `);

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_news_status_published_at
      ON news (status, published_at DESC)
  `);

  await seedNewsIfEmpty(db);
}

async function seedNewsIfEmpty(db: Client) {
  const existing = await db.execute("SELECT COUNT(*) as count FROM news");
  const count = Number(existing.rows[0]?.count ?? 0);

  if (count > 0) {
    return;
  }

  const articles = (seedNews as unknown[])
    .map(normalizeArticle)
    .filter((article): article is NewsArticle => Boolean(article));

  for (const article of articles) {
    await insertArticle(db, article, "INSERT OR IGNORE");
  }
}

function rowToArticle(row: NewsRow): NewsArticle {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    excerpt: String(row.excerpt ?? ""),
    content: String(row.content ?? ""),
    category: String(row.category ?? "Company News"),
    image: String(row.image ?? fallbackNewsImage),
    publishedAt: String(row.publishedAt ?? ""),
    status: toStatus(row.status),
    updatedAt: String(row.updatedAt ?? ""),
  };
}

async function selectNewsRows(status?: NewsStatus) {
  const db = await getDatabase();
  const result = await db.execute({
    sql: `
      SELECT
        id,
        slug,
        title,
        excerpt,
        content,
        category,
        image,
        published_at as publishedAt,
        status,
        updated_at as updatedAt
      FROM news
      ${status ? "WHERE status = ?" : ""}
      ORDER BY published_at DESC, updated_at DESC
    `,
    args: status ? [status] : [],
  });

  return result.rows as unknown as NewsRow[];
}

async function getArticleById(id: string) {
  const db = await getDatabase();
  const result = await db.execute({
    sql: `
      SELECT
        id,
        slug,
        title,
        excerpt,
        content,
        category,
        image,
        published_at as publishedAt,
        status,
        updated_at as updatedAt
      FROM news
      WHERE id = ?
      LIMIT 1
    `,
    args: [id],
  });
  const row = result.rows[0] as unknown as NewsRow | undefined;

  return row ? rowToArticle(row) : null;
}

async function makeUniqueSlug(requestedSlug: string, currentId?: string) {
  const db = await getDatabase();
  const baseSlug = slugify(requestedSlug);
  let slug = baseSlug;
  let counter = 2;

  while (await slugExists(db, slug, currentId)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}

async function slugExists(db: Client, slug: string, currentId?: string) {
  const result = await db.execute({
    sql: currentId
      ? "SELECT 1 FROM news WHERE slug = ? AND id != ? LIMIT 1"
      : "SELECT 1 FROM news WHERE slug = ? LIMIT 1",
    args: currentId ? [slug, currentId] : [slug],
  });

  return result.rows.length > 0;
}

export async function getAllNews() {
  return (await selectNewsRows()).map(rowToArticle);
}

export async function getPublishedNews() {
  return (await selectNewsRows("published")).map(rowToArticle);
}

export async function getNewsBySlug(slug: string) {
  const db = await getDatabase();
  const result = await db.execute({
    sql: `
      SELECT
        id,
        slug,
        title,
        excerpt,
        content,
        category,
        image,
        published_at as publishedAt,
        status,
        updated_at as updatedAt
      FROM news
      WHERE slug = ?
      LIMIT 1
    `,
    args: [slug],
  });
  const row = result.rows[0] as unknown as NewsRow | undefined;

  return row ? rowToArticle(row) : null;
}

function normalizeWritablePayload(payload: unknown, existing?: NewsArticle) {
  const body = isRecord(payload) ? payload : {};
  const now = new Date().toISOString();
  const title = toText(body.title, existing?.title);
  const content = toText(body.content, existing?.content);

  if (!title) {
    throw new NewsValidationError("Judul berita wajib diisi.");
  }

  if (!content) {
    throw new NewsValidationError("Isi berita wajib diisi.");
  }

  const publishedAt = toIsoDate(body.publishedAt, existing?.publishedAt ?? now);

  return {
    id: existing?.id ?? randomUUID(),
    title,
    requestedSlug: toText(body.slug, existing?.slug ?? title),
    excerpt: toText(body.excerpt, existing?.excerpt ?? summarizeContent(content)),
    content,
    category: toText(body.category, existing?.category ?? "Company News"),
    image: toImagePath(body.image ?? existing?.image),
    publishedAt,
    status: toStatus(body.status ?? existing?.status),
    updatedAt: now,
  };
}

async function insertArticle(
  db: Client,
  article: NewsArticle,
  command = "INSERT",
) {
  await db.execute({
    sql: `
      ${command} INTO news (
        id,
        slug,
        title,
        excerpt,
        content,
        category,
        image,
        published_at,
        status,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      article.id,
      article.slug,
      article.title,
      article.excerpt,
      article.content,
      article.category,
      article.image,
      article.publishedAt,
      article.status,
      article.updatedAt,
    ],
  });
}

export async function createNewsArticle(payload: unknown) {
  const normalized = normalizeWritablePayload(payload);
  const article: NewsArticle = {
    id: normalized.id,
    slug: await makeUniqueSlug(normalized.requestedSlug),
    title: normalized.title,
    excerpt: normalized.excerpt,
    content: normalized.content,
    category: normalized.category,
    image: normalized.image,
    publishedAt: normalized.publishedAt,
    status: normalized.status,
    updatedAt: normalized.updatedAt,
  };

  await insertArticle(await getDatabase(), article);
  return article;
}

export async function updateNewsArticle(id: string, payload: unknown) {
  const existing = await getArticleById(id);

  if (!existing) {
    throw new NewsNotFoundError("Berita tidak ditemukan.");
  }

  const normalized = normalizeWritablePayload(payload, existing);
  const article: NewsArticle = {
    id: normalized.id,
    slug: await makeUniqueSlug(normalized.requestedSlug, id),
    title: normalized.title,
    excerpt: normalized.excerpt,
    content: normalized.content,
    category: normalized.category,
    image: normalized.image,
    publishedAt: normalized.publishedAt,
    status: normalized.status,
    updatedAt: normalized.updatedAt,
  };

  const db = await getDatabase();
  await db.execute({
    sql: `
      UPDATE news
      SET
        slug = ?,
        title = ?,
        excerpt = ?,
        content = ?,
        category = ?,
        image = ?,
        published_at = ?,
        status = ?,
        updated_at = ?
      WHERE id = ?
    `,
    args: [
      article.slug,
      article.title,
      article.excerpt,
      article.content,
      article.category,
      article.image,
      article.publishedAt,
      article.status,
      article.updatedAt,
      article.id,
    ],
  });

  return article;
}

export async function deleteNewsArticle(id: string) {
  const db = await getDatabase();
  const result = await db.execute({
    sql: "DELETE FROM news WHERE id = ?",
    args: [id],
  });

  if (result.rowsAffected === 0) {
    throw new NewsNotFoundError("Berita tidak ditemukan.");
  }
}

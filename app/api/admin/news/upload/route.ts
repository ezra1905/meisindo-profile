import { put } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { checkAdminRequest } from "@/lib/news-admin";

export const runtime = "nodejs";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const maxUploadSize = 4 * 1024 * 1024;

function getSafeFileName(file: File) {
  const extension = path.extname(file.name).toLowerCase();
  const baseName = path
    .basename(file.name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return `${baseName || "news-image"}-${randomUUID()}${extension}`;
}

async function uploadToLocalPublic(file: File, fileName: string) {
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "news");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(
    path.join(uploadsDir, fileName),
    Buffer.from(await file.arrayBuffer()),
  );

  return {
    url: `/uploads/news/${fileName}`,
    pathname: `uploads/news/${fileName}`,
  };
}

export async function POST(request: Request) {
  const unauthorized = checkAdminRequest(request);

  if (unauthorized) {
    return unauthorized;
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "File gambar wajib dipilih." }, { status: 400 });
  }

  if (!allowedImageTypes.has(file.type)) {
    return Response.json(
      { error: "Format gambar harus JPG, PNG, WEBP, atau GIF." },
      { status: 400 },
    );
  }

  if (file.size > maxUploadSize) {
    return Response.json(
      { error: "Ukuran gambar maksimal 4 MB." },
      { status: 400 },
    );
  }

  const fileName = getSafeFileName(file);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`news/${fileName}`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return Response.json({
      url: blob.url,
      pathname: blob.pathname,
    });
  }

  if (process.env.NODE_ENV === "production") {
    return Response.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN belum diset untuk upload gambar di production.",
      },
      { status: 500 },
    );
  }

  return Response.json(await uploadToLocalPublic(file, fileName));
}

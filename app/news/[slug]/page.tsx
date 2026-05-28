import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Calendar, ChevronLeft } from "lucide-react";
import { fallbackNewsImage, getNewsBySlug } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article || article.status !== "published") {
    return {
      title: "Article Not Found | Meisindo Karya Semesta",
    };
  }

  return {
    title: `${article.title} | Meisindo Wine News`,
    description: article.excerpt,
    keywords: [article.category, "wine news", "Meisindo", "wine updates"],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: ["Meisindo Karya Semesta"],
      images: [
        {
          url: article.image || fallbackNewsImage,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recent" : dateFormatter.format(date);
}

function splitContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 pb-16 pt-20 text-[#03143f] sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/news"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed6a17] transition hover:text-[#03143f] sm:mb-12 sm:text-sm sm:tracking-[0.25em]"
        >
          <ChevronLeft size={18} />
          <span>Back to News</span>
        </Link>

        <header className="mb-10 sm:mb-14">
          <div className="mb-5 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-gray-400">
            <span className="text-[#ed6a17]">{article.category}</span>
            <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
              <Calendar size={14} />
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="font-cinzel mb-6 text-3xl font-bold leading-tight text-[#03143f] sm:text-5xl md:text-6xl">
            {article.title}
          </h1>

          <p className="max-w-3xl text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
            {article.excerpt}
          </p>
        </header>

        <div className="relative mb-10 aspect-[16/9] overflow-hidden border border-gray-100 shadow-lg sm:mb-14">
          <Image
            src={article.image || fallbackNewsImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b26]/30 via-transparent to-transparent" />
        </div>

        <div className="max-w-3xl space-y-7 text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
          {splitContent(article.content).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Calendar, ChevronLeft } from "lucide-react";
import { fallbackNewsImage, getNewsBySlug } from "@/lib/news";

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
    <main className="min-h-screen overflow-x-hidden bg-[#070707] px-4 pb-16 pt-20 text-white sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/news"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a86a] transition hover:text-white sm:mb-12 sm:text-sm sm:tracking-[0.25em]"
        >
          <ChevronLeft size={18} />
          <span>Back to News</span>
        </Link>

        <header className="mb-10 sm:mb-14">
          <div className="mb-5 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-white/45">
            <span className="text-[#c9a86a]">{article.category}</span>
            <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
              <Calendar size={14} />
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="font-cinzel mb-6 text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {article.title}
          </h1>

          <p className="max-w-3xl text-base leading-8 text-white/60 sm:text-lg sm:leading-9">
            {article.excerpt}
          </p>
        </header>

        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 sm:mb-14 sm:rounded-3xl">
          <Image
            src={article.image || fallbackNewsImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>

        <div className="max-w-3xl space-y-7 text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
          {splitContent(article.content).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}

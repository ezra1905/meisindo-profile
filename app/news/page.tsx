import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { fallbackNewsImage, getPublishedNews } from "@/lib/news";
import { generateNewsJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wine News & Updates | Meisindo Karya Semesta",
  description:
    "Latest wine news, portfolio updates, and partner support from Meisindo Karya Semesta. Stay updated with the latest from our wine collections.",
  keywords: ["wine news", "wine updates", "Meisindo news", "wine distributor Indonesia", "hospitality wine"],
  openGraph: {
    title: "Wine News & Updates | Meisindo Karya Semesta",
    description:
      "Latest wine news, portfolio updates, and partner support from Meisindo Karya Semesta.",
    type: "website",
    locale: "en_US",
    siteName: "Meisindo Karya Semesta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wine News & Updates | Meisindo Karya Semesta",
    description:
      "Latest wine news, portfolio updates, and partner support from Meisindo Karya Semesta.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recent" : dateFormatter.format(date);
}

export default async function NewsPage() {
  await connection();

  const news = await getPublishedNews();
  const newsJsonLd = await generateNewsJsonLd() || "";
  const breadcrumbJsonLd = await generateBreadcrumbJsonLd([
    { name: "Home", url: "https://www.meisindobali.com" },
    { name: "News", url: "https://www.meisindobali.com/news" },
  ]);

  return (
    <>
      {newsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: newsJsonLd }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <main className="min-h-screen overflow-x-hidden bg-white px-4 pb-16 pt-20 text-[#03143f] sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed6a17] transition hover:text-[#03143f] sm:mb-12 sm:text-sm sm:tracking-[0.25em]"
        >
          <ChevronLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-12 text-left sm:mb-16 sm:text-center lg:mb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[#ed6a17] sm:text-sm sm:tracking-[0.4em]">
            News
          </p>

          <h1 className="font-cinzel mx-auto mb-6 max-w-4xl text-3xl font-bold leading-tight text-[#03143f] sm:mb-8 sm:text-5xl md:text-6xl">
            Latest Updates
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-9">
            Company news, wine portfolio updates, and partner support notes from
            Meisindo Karya Semesta.
          </p>
        </div>

        {news.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group flex min-w-0 flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image || fallbackNewsImage}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020b26]/60 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-gray-400">
                    <span className="font-medium uppercase tracking-wider text-[#ed6a17]">{article.category}</span>
                    <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
                      <Calendar size={14} />
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  <h2 className="mb-4 text-xl font-bold leading-snug text-[#03143f]">
                    {article.title}
                  </h2>

                  <p className="mb-8 line-clamp-2 leading-relaxed text-gray-600">
                    {article.excerpt}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a17] transition group-hover:gap-3">
                    Read More
                    <ChevronRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-gray-100 bg-gray-50 p-10 text-center text-gray-500">
            No news has been published yet.
          </div>
        )}
      </div>
    </main>
    </>
  );
}

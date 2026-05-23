import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getPublishedNews } from "@/lib/news";

const productSlugs = [
  "france",
  "south-africa",
  "new-zealand",
  "italy",
  "australia",
  "spain",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/news"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: absoluteUrl(`/products/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let newsRoutes: MetadataRoute.Sitemap = [];

  try {
    const news = await getPublishedNews();

    newsRoutes = news.map((article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: article.updatedAt || article.publishedAt || now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    newsRoutes = [];
  }

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}

import { getPublishedNews } from "@/lib/news";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.meisindobali.com";

const productsData = [
  {
    slug: "france",
    title: "French Wine Collection",
    description: "Discover elegant French wines curated for premium hospitality and luxury dining experiences.",
    wines: ["Aurelius Saint Emilion Grand Cru", "Merlot Reserve"],
  },
  {
    slug: "south-africa",
    title: "South African Wine Collection",
    description: "Explore expressive South African wines from coastal vineyards and historic wine regions.",
    wines: ["Bernard Series Chenin Blanc", "Bellingham Series Shiraz"],
  },
  {
    slug: "new-zealand",
    title: "New Zealand Wine Collection",
    description: "Discover premium New Zealand wines known for their vibrant freshness and refined character.",
    wines: ["Turning Heads Pinot Noir", "Babydoll Sauvignon Blanc"],
  },
  {
    slug: "italy",
    title: "Italian Wine Collection",
    description: "Classic Italian selections with elegant structure and rich heritage.",
    wines: ["È Gòt Sangiovese Toscana"],
  },
  {
    slug: "australia",
    title: "Australian Wine Collection",
    description: "Bold and expressive wines from Australia's finest wine regions.",
    wines: ["Welland Cabernet Sauvignon", "McPherson Shiraz"],
  },
  {
    slug: "spain",
    title: "Spanish Wine Collection",
    description: "Mediterranean wine selections with expressive and elegant character.",
    wines: ["Expresion Series Tempranillo"],
  },
];

export async function generateJsonLd(): Promise<string> {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Meisindo Karya Semesta",
    url: siteUrl,
    logo: `${siteUrl}/Logo.png`,
    description: "Premium wine distributor for hotels, restaurants, lounges, and hospitality businesses in Indonesia.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-851-5781-5688",
      contactType: "sales",
    },
    sameAs: ["https://www.instagram.com/mksbali/"],
  };

  return JSON.stringify(websiteJsonLd);
}

export async function generateProductJsonLd(slug: string) {
  const product = productsData.find((p) => p.slug === slug);
  if (!product) return null;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: product.title,
    description: product.description,
    url: `${siteUrl}/products/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: product.wines.map((wine, index) => ({
        "@type": "Product",
        position: index + 1,
        name: wine,
        brand: {
          "@type": "Brand",
          name: "Meisindo Karya Semesta",
        },
        description: `${wine} from ${product.title}`,
      })),
    },
  };

  return JSON.stringify(productJsonLd);
}

export async function generateNewsJsonLd() {
  try {
    const news = await getPublishedNews();

    const newsArticlesJsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Wine News & Updates | Meisindo Karya Semesta",
      description: "Latest wine news, portfolio updates, and partner support from Meisindo Karya Semesta.",
      url: `${siteUrl}/news`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: news.map((article, index) => ({
          "@type": "Article",
          position: index + 1,
          headline: article.title,
          description: article.excerpt,
          url: `${siteUrl}/news/${article.slug}`,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt || article.publishedAt,
          image: article.image || `${siteUrl}/Hero.png`,
          publisher: {
            "@type": "Organization",
            name: "Meisindo Karya Semesta",
            logo: {
              "@type": "ImageObject",
              url: `${siteUrl}/Logo.png`,
            },
          },
          author: {
            "@type": "Organization",
            name: "Meisindo Karya Semesta",
          },
        })),
      },
    };

    return JSON.stringify(newsArticlesJsonLd);
  } catch {
    return null;
  }
}

export async function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return JSON.stringify(breadcrumbJsonLd);
}
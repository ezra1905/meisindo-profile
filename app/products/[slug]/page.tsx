import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Wine, Utensils, Star } from "lucide-react";
import type { Metadata } from "next";

type Wine = {
  name: string;
  image: string;
  alt: string;
  wineType: string;
  description: string;
  tastingNotes: string[];
  pairings: string[];
  keywords: string[];
};

type WineCollection = {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  region: string;
  wines: Wine[];
};

const wineData: Record<string, WineCollection> = {
  france: {
    title: "French Wine Collection",
    description:
      "Discover elegant French wines curated for premium hospitality and luxury dining experiences.",
    metaTitle: "Premium French Wine Collection | Bordeaux, Burgundy & Champagne",
    metaDescription:
      "Explore our curated selection of French wines including Bordeaux, Burgundy, and Champagne. Perfect for hotels, restaurants, and luxury hospitality venues.",
    keywords: ["French wine", "Bordeaux wine", "Burgundy wine", "Champagne", "French wine distributor Indonesia"],
    region: "France",
    wines: [
      {
        name: "Aurelius Saint Emilion Grand Cru",
        image: "/wines/emilion.png",
        alt: "Aurelius Saint Emilion Grand Cru - Premium French Bordeaux Red Wine",
        wineType: "Red Wine | Bordeaux AOC",
        description:
          "A distinguished Saint Emilion Grand Cru showcasing rich blackcurrant, plum, and cedar notes with velvety tannins and a long, elegant finish.",
        tastingNotes: ["Blackcurrant", "Plum", "Cedar", "Tobacco", "Dark Chocolate"],
        pairings: ["Prime Rib", "Duck Confit", "Aged Cheese", "Beef Tenderloin"],
        keywords: ["Saint Emilion Grand Cru", "Bordeaux red wine", "French wine for restaurants", "premium red wine"],
      },
      {
        name: "Merlot Reserve",
        image: "/wines/merlot.png",
        alt: "French Merlot Reserve - Smooth Burgundy Style Red Wine",
        wineType: "Red Wine | Merlot",
        description:
          "Silky and approachable Merlot with lush red fruit, subtle oak integration, and a velvety texture ideal for modern dining.",
        tastingNotes: ["Ripe Cherry", "Blackberry", "Vanilla", "Cocoa", "Soft Spice"],
        pairings: ["Roasted Chicken", "Pasta", "Lamb", "Soft Cheeses"],
        keywords: ["French Merlot", "soft red wine", "food-friendly wine", "restaurant wine selection"],
      },
    ],
  },

  "south-africa": {
    title: "South African Wine Collection",
    description:
      "Explore expressive South African wines from coastal vineyards and historic wine regions.",
    metaTitle: "South African Wine Collection | Stellenbosch & Western Cape Wines",
    metaDescription:
      "Premium South African wines from Stellenbosch and Western Cape. Exceptional red and white wines perfect for hotels, restaurants, and retail partners in Indonesia.",
    keywords: ["South African wine", "Stellenbosch wine", "Cape wine", "African wine distributor", "Western Cape wines"],
    region: "South Africa",
    wines: [
      {
        name: "Bernard Series Chenin Blanc",
        image: "/wines/bernard.png",
        alt: "Bernard Series Chenin Blanc - South African White Wine from Stellenbosch",
        wineType: "White Wine | Chenin Blanc",
        description:
          "Crisp and vibrant Chenin Blanc with bright citrus, stone fruit, and mineral complexity. A versatile white showcasing South Africa's winemaking excellence.",
        tastingNotes: ["Green Apple", "Citrus", "Honey", "White Peach", "Wet Stone"],
        pairings: ["Seafood", "Light Pasta", "Salads", "Spicy Asian Cuisine"],
        keywords: ["Chenin Blanc South Africa", "Stellenbosch white wine", "South African white wine", "wine for seafood restaurants"],
      },
      {
        name: "Bellingham Series Shiraz",
        image: "/wines/bellingham.png",
        alt: "Bellingham Series Shiraz - Premium South African Red Wine",
        wineType: "Red Wine | Shiraz",
        description:
          "Rich and bold Shiraz expressing South Africa's signature style with dark fruit, white pepper, and smoky undertones from coastal vineyards.",
        tastingNotes: ["Blackberry", "Blueberry", "White Pepper", "Smoked Meat", "Dark Plum"],
        pairings: ["Grilled meats", "Spicy dishes", "Barbecue", "Game meats"],
        keywords: ["South African Shiraz", "Bellingham wine", "premium red wine for hotels", "Indonesian wine distributor"],
      },
    ],
  },

  "new-zealand": {
    title: "New Zealand Wine Collection",
    description:
      "Discover premium New Zealand wines known for their vibrant freshness and refined character.",
    metaTitle: "Premium New Zealand Wine Collection | Marlborough & Central Otago",
    metaDescription:
      "Explore our selection of New Zealand wines featuring Marlborough Sauvignon Blanc and Central Otago Pinot Noir. Ideal for premium hospitality venues.",
    keywords: ["New Zealand wine", "Marlborough wine", "Sauvignon Blanc", "Pinot Noir NZ", "Oceanic wine"],
    region: "New Zealand",
    wines: [
      {
        name: "Turning Heads Pinot Noir",
        image: "/wines/turningheads.png",
        alt: "Turning Heads Pinot Noir - Central Otago New Zealand Premium Red Wine",
        wineType: "Red Wine | Pinot Noir",
        description:
          "Refined and elegant Pinot Noir from Central Otago with silky texture, bright cherry, and subtle earthy complexity that evolves beautifully in the glass.",
        tastingNotes: ["Cherry", "Raspberry", "Violet", "Mushroom", "Subtle Oak"],
        pairings: ["Salmon", "Duck", "Mushroom Risotto", "Light Game"],
        keywords: ["Central Otago Pinot Noir", "New Zealand Pinot Noir", "fine wine for restaurants", "premium hospitality wine"],
      },
      {
        name: "Babydoll Sauvignon Blanc",
        image: "/wines/babydoll.png",
        alt: "Babydoll Marlborough Sauvignon Blanc - Crisp New Zealand White Wine",
        wineType: "White Wine | Sauvignon Blanc",
        description:
          "Iconic Marlborough Sauvignon Blanc delivering explosive citrus, tropical fruit, and herbaceous notes with crisp acidity and a refreshing finish.",
        tastingNotes: ["Passion Fruit", "Grapefruit", "Gooseberry", "Fresh Herbs", "Mineral"],
        pairings: ["Oysters", "Shellfish", "Goat Cheese", "Thai cuisine"],
        keywords: ["Marlborough Sauvignon Blanc", "New Zealand white wine", "crisp wine for hotels", "restaurant wine list"],
      },
    ],
  },

  italy: {
    title: "Italian Wine Collection",
    description:
      "Classic Italian selections with elegant structure and rich heritage.",
    metaTitle: "Italian Wine Collection | Tuscany, Veneto & Piedmont Premium Wines",
    metaDescription:
      "Authentic Italian wines from Tuscany, Veneto, and Piedmont. Curated selections of Chianti, Prosecco, and Barolo perfect for Italian restaurants and luxury hospitality.",
    keywords: ["Italian wine", "Tuscany wine", "Chianti", "Prosecco", "Italian wine importer"],
    region: "Italy",
    wines: [
      {
        name: "È Gòt Sangiovese Toscana",
        image: "/wines/e-got.png",
        alt: "È Gòt Sangiovese Toscana - Premium Italian Tuscan Red Wine",
        wineType: "Red Wine | Sangiovese | Tuscany IGT",
        description:
          "Authentic Tuscan Sangiovese expressing the heart of Italy with vibrant cherry, Tuscan herbs, and fine-grained tannins from historic vineyards.",
        tastingNotes: ["Sour Cherry", "Tuscan Herbs", "Leather", "Earth", "Tobacco"],
        pairings: ["Bistecca Fiorentina", "Pasta with Ragu", "Pecorino Cheese", "Risotto"],
        keywords: ["Sangiovese Tuscany", "Italian red wine", "wine for Italian restaurants", "authentic Italian wine"],
      },
    ],
  },

  australia: {
    title: "Australian Wine Collection",
    description:
      "Bold and expressive wines from Australia's finest wine regions.",
    metaTitle: "Premium Australian Wine Collection | Shiraz, Cabernet & More",
    metaDescription:
      "Explore Australia's finest wines including McPherson Shiraz and Welland Cabernet from Margaret River and Yarra Valley. Premium selection for hotels and restaurants in Indonesia.",
    keywords: ["Australian wine", "Shiraz", "Cabernet Sauvignon", "Margaret River wine", "Australian wine distributor"],
    region: "Australia",
    wines: [
      {
        name: "Welland Cabernet Sauvignon",
        image: "/wines/welland.png",
        alt: "Welland Cabernet Sauvignon - Premium Australian Red Wine from Margaret River",
        wineType: "Red Wine | Welland Shiraz Barossa Valley",
        description:
          "Bold Margaret River Cabernet Sauvignon with concentrated blackcurrant, cassis, and cedar notes supported by firm tannins and exceptional cellaring potential.",
        tastingNotes: ["Blackcurrant", "Cassis", "Cedar", "Eucalyptus", "Dark Chocolate"],
        pairings: ["Grilled Steak", "Roast Lamb", "Aged Cheddar", "Beef Wellington"],
        keywords: ["Margaret River Cabernet", "Australian Cabernet Sauvignon", "premium red wine wholesale", "wine for steakhouses"],
      },
      {
        name: "McPherson Shiraz",
        image: "/wines/mcperson.png",
        alt: "McPherson Shiraz - Australian Premium Red Wine with Spice",
        wineType: "White Wine | McPherson Sauvignon Blanc",
        description:
          "McPherson Shiraz showcases bold berry fruit, white pepper, and savory undertones with velvety tannins and a lingering spicy finish characteristic of Australia's best.",
        tastingNotes: ["Blackberry", "Plum", "White Pepper", "Vanilla", "Spice"],
        pairings: ["BBQ ribs", "Beef Stew", "Strong Cheese", "Grilled Vegetables"],
        keywords: ["Australian Shiraz wine", "McPherson wine", "bold white wine for restaurants", "hospitality wine supplier"],
      },
    ],
  },

  spain: {
    title: "Spanish Wine Collection",
    description:
      "Mediterranean wine selections with expressive and elegant character.",
    metaTitle: "Spanish Wine Collection | Tempranillo, Garnacha & Mediterranean Reds",
    metaDescription:
      "Premium Spanish wines featuring Tempranillo and Garnacha from renowned regions. Perfect Mediterranean-style wines for hotels, restaurants, and tapas venues in Indonesia.",
    keywords: ["Spanish wine", "Tempranillo", "Rioja wine", "Spanish red wine", "Mediterranean wine"],
    region: "Spain",
    wines: [
      {
        name: "Expresion Series Tempranillo",
        image: "/wines/expresion.png",
        alt: "Expresion Series Tempranillo - Premium Spanish Red Wine",
        wineType: "Red Wine | Tempranillo | Rioja Style",
        description:
          "Expressive Tempranillo delivering rich berry fruit, vanilla, and subtle smoky notes with elegant tannins. A sophisticated Spanish wine for discerning palates.",
        tastingNotes: ["Strawberry", "Cherry", "Vanilla", "Leather", "Smoke"],
        pairings: ["Jamón Ibérico", "Paella", "Chorizo", "Manchego Cheese"],
        keywords: ["Spanish Tempranillo", "Rioja-style wine", "Mediterranean red wine", "wine for Spanish restaurants"],
      },
    ],
  },
};

const fallbackWineImage = "/wine-1.png";

function getWineImage(image: string) {
  const normalizedImage = image.startsWith("/") ? image.slice(1) : image;
  const publicImagePath = path.join(process.cwd(), "public", normalizedImage);

  return existsSync(publicImagePath) ? image : fallbackWineImage;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = wineData[slug];

  if (!product) {
    return {
      title: "Product Not Found | Meisindo Karya Semesta",
    };
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    keywords: product.keywords,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      type: "website",
      url: `https://www.meisindobali.com/products/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = wineData[slug];

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 text-center text-gray-500">
        Product not found
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 pb-16 pt-20 text-[#03143f] sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#products"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed6a17] transition hover:text-[#03143f] sm:mb-12 sm:text-sm sm:tracking-[0.25em]"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to Home</span>
        </Link>

        <div className="mb-12 text-left sm:mb-16 sm:text-center lg:mb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[#ed6a17] sm:text-sm sm:tracking-[0.4em]">
            Wine Collection
          </p>

          <h1 className="font-cinzel mx-auto mb-6 max-w-4xl text-3xl font-bold leading-tight text-[#03143f] sm:mb-8 sm:text-5xl md:text-6xl">
            {product.title}
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-9">
            {product.description}
          </p>
        </div>

        <div
          className={`mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10 ${
            product.wines.length > 2 ? "lg:grid-cols-3" : "lg:max-w-4xl"
          }`}
        >
          {product.wines.map((wine) => (
            <article
              key={wine.name}
              className="group flex min-w-0 flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-4/3 overflow-hidden sm:aspect-3/4 lg:aspect-4/5">
                <Image
                  src={getWineImage(wine.image)}
                  alt={wine.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020b26]/40 via-transparent to-transparent" />

                {/* Wine Type Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#ed6a17] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  <Wine size={12} />
                  <span>{wine.wineType}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                <h2 className="mb-2 text-2xl font-bold leading-snug text-[#03143f] sm:mb-3 sm:text-3xl">
                  {wine.name}
                </h2>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {wine.description}
                </p>

                {/* Tasting Notes */}
                <div className="mb-4">
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ed6a17]">
                    <Star size={12} />
                    Tasting Notes
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {wine.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-[#ed6a17]/20 bg-[#ed6a17]/5 px-2.5 py-1 text-[10px] font-medium text-[#03143f]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Food Pairings */}
                <div className="mb-5">
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ed6a17]">
                    <Utensils size={12} />
                    Perfect With
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {wine.pairings.map((pairing) => (
                      <span
                        key={pairing}
                        className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-600"
                      >
                        {pairing}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/6285157815688?text=${encodeURIComponent(`Halo Meisindo, saya tertarik dengan ${wine.name} - ${wine.wineType}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600"
                >
                  <MessageCircle size={18} />
                  Message Us
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

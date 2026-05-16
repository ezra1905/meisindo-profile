import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

type Wine = {
  name: string;
  image: string;
  description: string;
};

type WineCollection = {
  title: string;
  description: string;
  wines: Wine[];
};

const wineData: Record<string, WineCollection> = {
  france: {
    title: "French Wine Collection",
    description:
      "Discover elegant French wines curated for premium hospitality and luxury dining experiences.",
    wines: [
      {
        name: "Aurelius Saint Emilion Grand Cru",
        image: "/wines/emilion.png",
        description:
          "Rich full-bodied wine with dark fruit and oak complexity.",
      },
      {
        name: "Merlot",
        image: "/wines/merlot.png",
        description: "Smooth and velvety wine with balanced fruit character.",
      },
    ],
  },

  "south-africa": {
    title: "South African Wine Collection",
    description:
      "Explore expressive South African wines from coastal vineyards and historic wine regions.",
    wines: [
      {
        name: "Chenin Blanc",
        image: "/wines/chenin-blanc.jpg",
        description:
          "Fresh and vibrant white wine with citrus, apple, and mineral notes.",
      },
      {
        name: "Pinotage",
        image: "/wines/pinotage.jpg",
        description:
          "South Africa's signature red wine with dark fruit, spice, and smoky character.",
      },
      {
        name: "Sauvignon Blanc",
        image: "/wines/south-africa-sauvignon-blanc.jpg",
        description:
          "Crisp coastal white wine with tropical fruit and refreshing acidity.",
      },
    ],
  },

  "new-zealand": {
    title: "New Zealand Wine Collection",
    description:
      "Discover premium New Zealand wines known for their vibrant freshness and refined character.",
    wines: [
      {
        name: "Turning Heads",
        image: "/wines/turningheads.png",
        description:
          "Refined wine experience that stands out for its rich flavors and smooth finish.",
      },
      {
        name: "Babydoll",
        image: "/wines/babydoll.png",
        description:
          "Refreshing Marlborough wine with elegance.",
      },
    ],
  },

  italy: {
    title: "Italian Wine Collection",
    description:
      "Classic Italian selections with elegant structure and rich heritage.",
    wines: [
      {
        name: "Chianti",
        image: "/wines/chianti.jpg",
        description:
          "Traditional Tuscan wine with vibrant cherry and spice notes.",
      },
      {
        name: "Barolo",
        image: "/wines/barolo.jpg",
        description:
          "Powerful and refined wine with exceptional aging potential.",
      },
      {
        name: "Pinot Grigio",
        image: "/wines/pinot-grigio.jpg",
        description: "Fresh and crisp white wine perfect for modern dining.",
      },
    ],
  },

  australia: {
    title: "Australian Wine Collection",
    description:
      "Bold and expressive wines from Australia's finest wine regions.",
    wines: [
      {
        name: "Welland",
        image: "/wines/welland.png",
        description: "Bold red wine with dark berries and pepper complexity.",
      },
      {
        name: "McPherson",
        image: "/wines/mcperson.png",
        description: "Structured wine with elegant tannins and oak finish.",
      },
    ],
  },

  spain: {
    title: "Spanish Wine Collection",
    description:
      "Mediterranean wine selections with expressive and elegant character.",
    wines: [
      {
        name: "Tempranillo",
        image: "/wines/tempranillo.jpg",
        description:
          "Classic Spanish red wine with rich berry and spice notes.",
      },
      {
        name: "Rioja",
        image: "/wines/rioja.jpg",
        description: "Elegant oak-aged wine with smooth balanced structure.",
      },
      {
        name: "Cava",
        image: "/wines/cava.jpg",
        description: "Premium sparkling wine with refreshing citrus finish.",
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = wineData[slug];

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-center text-white">
        Product not found
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070707] px-4 pb-16 pt-20 text-white sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#products"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a86a] transition hover:text-white sm:mb-12 sm:text-sm sm:tracking-[0.25em]"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to Home</span>
        </Link>

        <div className="mb-12 text-left sm:mb-16 sm:text-center lg:mb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[#c9a86a] sm:text-sm sm:tracking-[0.4em]">
            Wine Collection
          </p>

          <h1 className="font-cinzel mx-auto mb-6 max-w-4xl text-3xl font-bold leading-tight sm:mb-8 sm:text-5xl md:text-6xl">
            {product.title}
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-7 text-white/60 sm:text-lg sm:leading-9">
            {product.description}
          </p>
        </div>

        <div
          className={`mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8 ${
            product.wines.length > 2 ? "lg:grid-cols-3" : "lg:max-w-4xl"
          }`}
        >
          {product.wines.map((wine) => (
            <div
              key={wine.name}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-[#c9a86a]/60 hover:shadow-[0_0_40px_rgba(201,168,106,0.2)] sm:rounded-3xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src={getWineImage(wine.image)}
                  alt={wine.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                <h2 className="mb-3 text-2xl font-semibold leading-snug sm:mb-4 sm:text-3xl">
                  {wine.name}
                </h2>

                <p className="text-sm leading-7 text-white/60 sm:text-base">
                  {wine.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

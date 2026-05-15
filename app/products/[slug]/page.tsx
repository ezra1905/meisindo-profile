import Image from "next/image";
import Link from "next/link";

const wineData: Record<
  string,
  {
    title: string;
    description: string;
    wines: {
      name: string;
      image: string;
      description: string;
    }[];
  }
> = {
  france: {
    title: "French Wine Collection",
    description:
      "Discover elegant French wines curated for premium hospitality and luxury dining experiences.",
    wines: [
      {
        name: "Chardonnay",
        image: "/wines/chardonnay.jpg",
        description:
          "Elegant white wine with citrus, vanilla, and creamy textures.",
      },
      {
        name: "Cabernet Sauvignon",
        image: "/wines/cabernet.jpg",
        description:
          "Rich full-bodied wine with dark fruit and oak complexity.",
      },
      {
        name: "Merlot",
        image: "/wines/merlot.jpg",
        description:
          "Smooth and velvety wine with balanced fruit character.",
      },
    ],
  },
/*
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
        "South Africa’s signature red wine with dark fruit, spice, and smoky character.",
    },
    {
      name: "Sauvignon Blanc",
      image: "/wines/south-africa-sauvignon-blanc.jpg",
      description:
        "Crisp coastal white wine with tropical fruit and refreshing acidity.",
    },
  ],
},
*/

"new-zealand": {
  title: "New Zealand Wine Collection",
  description:
    "Discover premium New Zealand wines known for their vibrant freshness and refined character.",
  wines: [
    {
      name: "Sauvignon Blanc",
      image: "/wines/nz-sauvignon-blanc.jpg",
      description:
        "Crisp and aromatic white wine with citrus and tropical fruit notes.",
    },
    {
      name: "Pinot Noir",
      image: "/wines/nz-pinot-noir.jpg",
      description:
        "Elegant red wine with silky texture and refined berry character.",
    },
    {
      name: "Chardonnay",
      image: "/wines/nz-chardonnay.jpg",
      description:
        "Balanced white wine with creamy texture and subtle oak complexity.",
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
        description:
          "Fresh and crisp white wine perfect for modern dining.",
      },
    ],
  },

  australia: {
    title: "Australian Wine Collection",
    description:
      "Bold and expressive wines from Australia’s finest wine regions.",
    wines: [
      {
        name: "Shiraz",
        image: "/wines/shiraz.jpg",
        description:
          "Bold red wine with dark berries and pepper complexity.",
      },
      {
        name: "Cabernet",
        image: "/wines/australia-cabernet.jpg",
        description:
          "Structured wine with elegant tannins and oak finish.",
      },
    ],
  },
/*
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
        description:
          "Elegant oak-aged wine with smooth balanced structure.",
      },
      {
        name: "Cava",
        image: "/wines/cava.jpg",
        description:
          "Premium sparkling wine with refreshing citrus finish.",
      },
    ],
  },
  */
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = wineData[slug];

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        Product not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#products"
          className="mb-12 inline-flex text-sm uppercase tracking-[0.25em] text-[#c9a86a]"
        >
          ← Back to Home
        </Link>

        <div className="mb-20 text-center">
          <p className="mb-4 uppercase tracking-[0.4em] text-[#c9a86a]">
            Wine Collection
          </p>

          <h1 className="font-cinzel mb-8 text-4xl font-bold sm:text-5xl md:text-6xl">
            {product.title}
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-9 text-white/60">
            {product.description}
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8">
          {product.wines.map((wine) => (
            <div
              key={wine.name}
              className="group w-full max-w-[380px] flex-1 sm:flex-none overflow-hidden rounded-3xl border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-[#c9a86a]/60 hover:shadow-[0_0_40px_rgba(201,168,106,0.2)]"
            >
              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="p-8">
                <h2 className="mb-4 text-3xl font-semibold">
                  {wine.name}
                </h2>

                <p className="leading-7 text-white/60">
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
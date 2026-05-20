"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Wine,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Calendar,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

const products = [
  {
    country: "New Zealand",
    flag: "new-zealand",
    region: "Marlborough & Central Otago",
    highlight: "Fresh whites and refined pinot selections.",
  },
  {
    country: "France",
    flag: "france",
    region: "Bordeaux, Burgundy & Champagne",
    highlight: "Classic appellations for premium hospitality lists.",
  },
  {
    country: "South Africa",
    flag: "south-africa",
    region: "Stellenbosch & Western Cape",
    highlight: "Expressive reds and crisp coastal varieties.",
  },
  {
    country: "Italy",
    flag: "italy",
    region: "Tuscany, Veneto & Piedmont",
    highlight: "Elegant old-world bottles with food-friendly depth.",
  },

  {
    country: "Australia",
    flag: "australia",
    region: "Welland, Margaret River & Yarra Valley",
    highlight: "Bold shiraz, refined cabernet, and vibrant coastal whites.",
  },
  {
    country: "Spain",
    flag: "spain",
    region: "Expresion, Sandara, Hoya de Cadenas",
    highlight:
      "Rich reds, elegant tempranillo, and expressive Mediterranean styles.",
  },
];

const productCarousel = [...products, ...products];

const clients = [
  "Hotels",
  "Restaurants",
  "Bars & Lounge",
  "Retail Partners",
  "Event Organizers",
  "Cafés",
];

type NewsPreview = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
};

const newsDateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatNewsDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Recent"
    : newsDateFormatter.format(date);
}

function CountryFlag({ variant }: { variant: string }) {
  if (variant === "france") {
    return (
      <div className="flex h-10 w-14 overflow-hidden rounded-md border border-white/25 shadow-inner">
        <span className="h-full flex-1 bg-[#002654]" />
        <span className="h-full flex-1 bg-white" />
        <span className="h-full flex-1 bg-[#ed2939]" />
      </div>
    );
  }

  if (variant === "italy") {
    return (
      <div className="flex h-10 w-14 overflow-hidden rounded-md border border-white/25 shadow-inner">
        <span className="h-full flex-1 bg-[#008c45]" />
        <span className="h-full flex-1 bg-[#f4f5f0]" />
        <span className="h-full flex-1 bg-[#cd212a]" />
      </div>
    );
  }

  if (variant === "south-africa") {
    return (
      <div className="relative h-10 w-14 overflow-hidden rounded-md border border-white/25 bg-[#002395] shadow-inner">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-[#de3831]" />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#002395]" />
        <span className="absolute inset-x-0 top-[15px] h-2.5 bg-white" />
        <span className="absolute inset-x-0 top-[17px] h-1.5 bg-[#007a4d]" />
        <span className="absolute inset-y-0 left-0 w-11 bg-white [clip-path:polygon(0_0,78%_50%,0_100%)]" />
        <span className="absolute inset-y-0 left-0 w-9 bg-[#ffb612] [clip-path:polygon(0_0,78%_50%,0_100%)]" />
        <span className="absolute inset-y-0 left-0 w-7 bg-black [clip-path:polygon(0_0,78%_50%,0_100%)]" />
        <span className="absolute inset-y-[6px] left-0 w-11 bg-[#007a4d] [clip-path:polygon(0_0,72%_50%,0_100%)]" />
      </div>
    );
  }

  if (variant === "australia") {
    return (
      <div className="relative h-10 w-14 overflow-hidden rounded-md border border-white/25 bg-[#00008b] shadow-inner">
        <div className="absolute left-0 top-0 h-5 w-7 overflow-hidden bg-[#012169]">
          <span className="absolute left-[-5px] top-[8px] h-[3px] w-10 rotate-[33deg] bg-white" />
          <span className="absolute left-[-5px] top-[8px] h-[3px] w-10 -rotate-[33deg] bg-white" />
          <span className="absolute left-0 top-[8px] h-[4px] w-7 bg-white" />
          <span className="absolute left-[11px] top-0 h-5 w-[4px] bg-white" />
          <span className="absolute left-[-4px] top-[9px] h-[1.5px] w-9 rotate-[33deg] bg-[#c8102e]" />
          <span className="absolute left-[-4px] top-[9px] h-[1.5px] w-9 -rotate-[33deg] bg-[#c8102e]" />
          <span className="absolute left-0 top-[9px] h-0.5 w-7 bg-[#c8102e]" />
          <span className="absolute left-[12px] top-0 h-5 w-0.5 bg-[#c8102e]" />
        </div>
        <span className="flag-star absolute bottom-2 left-4 h-2.5 w-2.5 bg-white" />
        <span className="flag-star absolute right-3 top-2 h-2 w-2 bg-white" />
        <span className="flag-star absolute right-6 top-5 h-1.5 w-1.5 bg-white" />
        <span className="flag-star absolute bottom-2 right-3 h-1.5 w-1.5 bg-white" />
        <span className="flag-star absolute bottom-4 right-6 h-1 w-1 bg-white" />
      </div>
    );
  }

  if (variant === "spain") {
    return (
      <div className="relative flex h-10 w-14 flex-col overflow-hidden rounded-md border border-white/25 shadow-inner">
        <span className="h-1/4 bg-[#aa151b]" />
        <span className="h-1/2 bg-[#f1bf00]" />
        <span className="h-1/4 bg-[#aa151b]" />
        <span className="absolute left-3 top-[16px] h-2 w-1.5 rounded-[1px] border border-[#aa151b] bg-[#f1bf00]" />
      </div>
    );
  }

  return (
    <div className="relative h-10 w-14 overflow-hidden rounded-md border border-white/25 bg-[#00247d] shadow-inner">
      <div className="absolute left-0 top-0 h-5 w-7 overflow-hidden bg-[#012169]">
        <span className="absolute left-[-5px] top-[8px] h-[3px] w-10 rotate-[33deg] bg-white" />
        <span className="absolute left-[-5px] top-[8px] h-[3px] w-10 -rotate-[33deg] bg-white" />
        <span className="absolute left-0 top-[8px] h-[4px] w-7 bg-white" />
        <span className="absolute left-[11px] top-0 h-5 w-[4px] bg-white" />
        <span className="absolute left-[-4px] top-[9px] h-[1.5px] w-9 rotate-[33deg] bg-[#c8102e]" />
        <span className="absolute left-[-4px] top-[9px] h-[1.5px] w-9 -rotate-[33deg] bg-[#c8102e]" />
        <span className="absolute left-0 top-[9px] h-0.5 w-7 bg-[#c8102e]" />
        <span className="absolute left-[12px] top-0 h-5 w-0.5 bg-[#c8102e]" />
      </div>
      <span className="flag-star absolute right-3 top-2 h-2.5 w-2.5 bg-white">
        <span className="flag-star absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#cc142b]" />
      </span>
      <span className="flag-star absolute right-6 top-5 h-2 w-2 bg-white">
        <span className="flag-star absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#cc142b]" />
      </span>
      <span className="flag-star absolute bottom-2 right-3 h-2 w-2 bg-white">
        <span className="flag-star absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#cc142b]" />
      </span>
      <span className="flag-star absolute bottom-3 right-6 h-2 w-2 bg-white">
        <span className="flag-star absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#cc142b]" />
      </span>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsPreview[]>([]);
  const [hasLoadedNews, setHasLoadedNews] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "News", href: "#news" },
    { label: "Clients", href: "#clients" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    let isMounted = true;

    async function loadNews() {
      try {
        const response = await fetch("/api/news", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load news");
        }

        const data = (await response.json()) as { news?: NewsPreview[] };

        if (isMounted) {
          setNewsItems((data.news ?? []).slice(0, 3));
        }
      } catch {
        if (isMounted) {
          setNewsItems([]);
        }
      } finally {
        if (isMounted) {
          setHasLoadedNews(true);
        }
      }
    }

    void loadNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#03143f] text-[#fff7ef]">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#020b26]/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
          <a
            href="#hero"
            className="flex items-center gap-3 transition duration-300 hover:opacity-80"
          >
            <Image
              src="/Logo.png"
              alt="Meisindo Karya Semesta"
              width={44}
              height={44}
              className="object-contain sm:h-[52px] sm:w-[52px]"
            />

            <span className="font-cinzel text-lg font-semibold tracking-[0.25em] text-[#fff7ef] sm:text-2xl sm:tracking-[0.35em]">
              MEISINDO
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden gap-8 text-sm text-[#fff7ef]/70 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition duration-300 hover:text-[#ed6a17]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#fff7ef] transition hover:border-[#ed6a17]/60 hover:text-[#ed6a17] md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Accordion Menu */}
        <div
          className={`overflow-hidden border-t border-white/10 bg-[#020b26]/80 backdrop-blur-xl transition-all duration-500 md:hidden ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 px-5 py-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#fff7ef]/70 transition duration-300 hover:border-[#ed6a17]/60 hover:bg-[#ed6a17]/10 hover:text-[#ed6a17]"
              >
                <span>{link.label}</span>

                <ChevronRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-screen w-full max-w-full items-center justify-center overflow-hidden px-6"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-[#020b26]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020b26]/20 via-[#004aad]/10 to-[#020b26]/60" />

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-5xl text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.5em] text-[#ed6a17]">
            Premium Wine Distributor
          </p>

          <h1 className="font-cinzel mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
            Meisindo
            <br />
            Karya Semesta
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base leading-8 text-[#fff7ef]/60 sm:text-lg sm:leading-9">
            Trusted premium wine distributor for hotels, restaurants, lounges,
            retail partners, and modern hospitality businesses.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#products"
              className="w-full rounded-full bg-[#ed6a17] px-8 py-4 text-center font-bold tracking-wide text-[#03143f] shadow-[0_0_40px_rgba(237,106,23,0.4)] transition hover:scale-105 sm:w-auto"
            >
              Explore Products
            </a>

            <a
              href="https://wa.me/6281999653330"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-4 font-bold tracking-wide transition hover:border-[#ed6a17] hover:text-[#ed6a17]"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
              About Us
            </p>

            <h2 className="mb-8 text-5xl font-bold leading-tight">
              Elegant Distribution
              <br />
              For Premium Wine
            </h2>

            <p className="text-lg leading-9 text-[#fff7ef]/60">
              Meisindo Karya Semesta is a premium wine distribution partner
              delivering professional service, extensive distribution networks,
              and a commitment to exceptional quality.
            </p>

            <div
              className="relative mt-10 h-[126px] w-[92px] opacity-85"
              aria-hidden="true"
            >
              <motion.div
                animate={
                  shouldReduceMotion ? undefined : { rotate: [-2, 2.5, -2] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 5.8, ease: "easeInOut", repeat: Infinity }
                }
                className="relative mx-auto h-[88px] w-[62px] origin-top overflow-hidden rounded-[10px_10px_24px_24px] border border-white/30 bg-white/[0.03] shadow-[inset_0_0_18px_rgba(255,255,255,0.06),0_14px_34px_rgba(3,20,63,0.22)]"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: [-2, 2, -2],
                          rotate: [1.5, -1.5, 1.5],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 4.6,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }
                  }
                  className="absolute bottom-0 left-[-14%] h-[42%] w-[128%] rounded-[46%_54%_18px_18px] bg-gradient-to-b from-[#ff9a45] to-[#b34d0f] shadow-[inset_0_10px_18px_rgba(255,247,239,0.12)]"
                >
                  <span className="absolute left-0 top-[-8px] h-4 w-full rounded-full bg-[#ed6a17]/90" />
                </motion.div>
                <span className="absolute left-3.5 top-3 h-10 w-2 rounded-full bg-white/20 blur-[0.2px]" />
              </motion.div>
              <span className="mx-auto -mt-px block h-7 w-px bg-white/30" />
              <span className="mx-auto block h-px w-[52px] rounded-full bg-white/30 shadow-[0_0_18px_rgba(237,106,23,0.14)]" />
            </div>
          </motion.div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <Wine className="mb-5 text-[#ed6a17]" size={40} />
              <h3 className="mb-3 text-2xl font-semibold">Premium Selection</h3>

              <p className="text-[#fff7ef]/60">
                Curated premium wine selections tailored for hospitality and
                lifestyle industries.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <Users className="mb-5 text-[#ed6a17]" size={40} />
              <h3 className="mb-3 text-2xl font-semibold">Trusted Clients</h3>

              <p className="text-[#fff7ef]/60">
                Trusted by dozens of hospitality, restaurant, and retail
                partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        id="products"
        className="scroll-mt-24 relative overflow-hidden border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{
            backgroundImage: "url('/bg-products.png')",
          }}
        />

        <div className="absolute inset-0 bg-[#020b26]/70" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
              Products
            </p>

            <h2 className="font-cinzel text-3xl font-bold sm:text-4xl md:text-5xl">
              Our Wine Collection
            </h2>
          </div>

          <div
            className="product-carousel w-full max-w-full overflow-hidden py-4"
            aria-label="Wine categories by country"
          >
            <div className="product-carousel-track flex gap-6">
              {productCarousel.map((item, index) => (
                <Link
                  href={`/products/${item.flag}`}
                  key={`${item.country}-${index}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % products.length) * 0.1 }}
                    className="group relative flex h-[390px] w-[16rem] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#020b26]/35 p-8 shadow-[0_0_0_rgba(237,106,23,0)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#ed6a17]/70 hover:bg-white/[0.08] hover:shadow-[0_0_42px_rgba(237,106,23,0.28)] sm:w-[22rem] lg:w-[24rem]"
                  >
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ed6a17]/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="absolute right-6 top-6 rounded-full border border-[#ed6a17]/20 px-4 py-1 text-xs uppercase tracking-[0.28em] text-[#ed6a17]/80">
                      Country
                    </div>

                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ed6a17]/10 transition duration-500 group-hover:bg-[#ed6a17]/20 group-hover:shadow-[0_0_28px_rgba(237,106,23,0.3)]">
                      <CountryFlag variant={item.flag} />
                    </div>

                    <h3 className="mb-3 text-3xl font-semibold">
                      {item.country}
                    </h3>
                    <p className="mb-5 text-sm uppercase tracking-[0.22em] text-[#fff7ef]/45">
                      {item.region}
                    </p>
                    <p className="mb-8 leading-7 text-[#fff7ef]/60">
                      {item.highlight}
                    </p>

                    <button className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a17] transition group-hover:gap-3">
                      Explore
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* News */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        id="news"
        className="scroll-mt-24 border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
                News
              </p>

              <h2 className="font-cinzel text-3xl font-bold sm:text-4xl md:text-5xl">
                Latest Updates
              </h2>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a17] transition hover:gap-3 hover:text-[#fff7ef]"
            >
              View All News
              <ChevronRight size={18} />
            </Link>
          </div>

          {hasLoadedNews ? (
            newsItems.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3">
                {newsItems.map((article) => (
                  <Link
                    href={`/news/${article.slug}`}
                    key={article.id}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-500 hover:-translate-y-2 hover:border-[#ed6a17]/60 hover:shadow-[0_0_40px_rgba(237,106,23,0.18)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.image || "/Hero.png"}
                        alt={article.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020b26]/80 via-[#020b26]/20 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#fff7ef]/45">
                        <span className="text-[#ed6a17]">
                          {article.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
                          <Calendar size={14} />
                          {formatNewsDate(article.publishedAt)}
                        </span>
                      </div>

                      <h3 className="mb-4 text-2xl font-semibold leading-snug">
                        {article.title}
                      </h3>

                      <p className="mb-8 leading-7 text-[#fff7ef]/60">
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
              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-[#fff7ef]/60">
                No news has been published yet.
              </div>
            )
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-[420px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Clients */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        id="clients"
        className="scroll-mt-24 border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
              Clients
            </p>

            <h2 className="font-cinzel text-3xl font-bold sm:text-4xl md:text-5xl">
              Trusted By Dozens of Clients
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-[#020b26]/30 p-10 text-center text-2xl font-medium text-[#fff7ef]/70 backdrop-blur-xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        id="contact"
        className="scroll-mt-24 border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
            Contact
          </p>

          <h2 className="font-cinzel mb-8 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Let’s Work Together
          </h2>

          <p className="mx-auto mb-16 max-w-2xl text-lg leading-9 text-[#fff7ef]/60">
            Contact us for premium wine distribution partnerships tailored for
            hospitality and retail businesses.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://wa.me/6281999653330"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-[#ed6a17]/60 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(237,106,23,0.18)]"
            >
              <MessageCircle className="mx-auto mb-5 text-[#ed6a17] transition group-hover:scale-110" />
              <p className="text-[#fff7ef]/70">Whatsapp</p>
            </a>

            <a
              href="mailto:salesmeisindo@gmail.com"
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-[#ed6a17]/60 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(237,106,23,0.18)]"
            >
              <Mail className="mx-auto mb-5 text-[#ed6a17]" />
              <p className="break-words text-[#fff7ef]/70">Mail Us</p>
            </a>

            <a
              href="https://share.google/G77DFOaC4jW96aIh2"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-[#ed6a17]/60 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(237,106,23,0.18)]"
            >
              <MapPin className="mx-auto mb-5 text-[#ed6a17] transition group-hover:scale-110" />
              <p className="text-[#fff7ef]/70">Open Google Maps</p>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Floating WA */}
      <a
        href="https://wa.me/6281999653330"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 animate-pulse rounded-full bg-[#ed6a17] p-4 sm:p-5 text-[#03143f] shadow-[0_0_50px_rgba(237,106,23,0.6)] transition hover:scale-110"
      >
        <Phone />
      </a>

      <footer className="border-t border-white/10 bg-[#020b26]/40 px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-cinzel mb-5 text-2xl font-semibold tracking-[0.2em]">
              MEISINDO
            </h3>

            <p className="leading-7 text-[#fff7ef]/50">
              Premium wine distributor for hospitality, retail, and lifestyle
              industries.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold text-[#ed6a17]">
              Navigation
            </h4>

            <ul className="space-y-3 text-[#fff7ef]/50">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#products">Products</a>
              </li>
              <li>
                <a href="#news">News</a>
              </li>
              <li>
                <a href="#clients">Clients</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold text-[#ed6a17]">
              Contact
            </h4>

            <ul className="space-y-3 text-[#fff7ef]/50">
              <li>salesmeisindo@gmail.com</li>
              <li>Indonesia</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-semibold text-[#ed6a17]">
              Business Hours
            </h4>

            <ul className="space-y-3 text-[#fff7ef]/50">
              <li>Monday - Saturday</li>
              <li>08:00 - 17:00</li>
              <li>Sunday Closed</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-8 text-center text-[#fff7ef]/40">
          © 2026 Meisindo Karya Semesta. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

"use client";

import FloatingContact from "./components/FloatingContact";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Star,
  Award,
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

        <div className="absolute inset-0 bg-[#020b26]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020b26]/20 via-[#004aad]/10 to-[#020b26]/60" />

        {/* Decorative floating elements */}
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-[#ed6a17]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#004aad]/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-5xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-5 text-sm uppercase tracking-[0.5em] text-[#ed6a17]"
          >
            Premium Wine Distributor
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-cinzel mb-6 text-4xl font-bold leading-tight text-gradient sm:text-5xl md:text-7xl lg:text-8xl"
          >
            Meisindo
            <br />
            Karya Semesta
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mb-8 max-w-3xl text-base leading-8 text-[#fff7ef]/60 sm:text-lg sm:leading-9"
          >
            Trusted premium wine distributor for hotels, restaurants, lounges,
            retail partners, and modern hospitality businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#products"
              className="hover-lift w-full rounded-full bg-[#ed6a17] px-8 py-4 text-center font-bold tracking-wide text-[#03143f] shadow-[0_0_40px_rgba(237,106,23,0.4)] sm:w-auto"
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
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative overflow-hidden bg-white px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ed6a17]/[0.02] to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]"
            >
              About Us
            </motion.p>
            <h2 className="font-cinzel text-3xl font-bold text-[#03143f] sm:text-4xl md:text-5xl">
              Elegant Distribution For Premium Wine
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#ed6a17] to-transparent" />
          </motion.div>

          {/* Stats Cards - Elegant Grid */}
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "6+", label: "Wine Origins", icon: Wine, desc: "Premier wine-producing countries" },
              { number: "50+", label: "Partner Hotels", icon: Users, desc: "Trusted hospitality venues" },
              { number: "100+", label: "Wine Selections", icon: Award, desc: "Curated premium bottles" },
              { number: "8+", label: "Years Experience", icon: Star, desc: "Industry expertise" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col items-center text-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#ed6a17]/30 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ed6a17]/10 to-[#ed6a17]/5 transition-all group-hover:scale-110">
                  <stat.icon className="h-7 w-7 text-[#ed6a17]" />
                </div>

                {/* Number */}
                <span className="font-cinzel text-4xl font-bold text-[#03143f]">{stat.number}</span>
                <span className="mt-1 text-sm font-medium text-[#ed6a17]">{stat.label}</span>
                <p className="mt-2 text-xs text-gray-400">{stat.desc}</p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ed6a17] to-transparent opacity-0 transition-all group-hover:w-3/4 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* Two Column Content */}
          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative element */}
              <div className="absolute -left-4 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[#ed6a17]/30 to-transparent" />

              <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#03143f]">
                <span className="h-8 w-1 bg-[#ed6a17]" />
                Our Story
              </h3>
              <p className="mb-4 text-base leading-relaxed text-gray-600">
                Meisindo Karya Semesta is a premium wine distributor based in Bali, serving the island's top hospitality and tourist areas including Canggu, Seminyak, Uluwatu, Ubud, Sanur, Jimbaran, Nusa Dua, and Kuta.
              </p>
              <p className="mb-4 text-base leading-relaxed text-gray-600">
                We specialize in supplying luxury hotels, fine dining restaurants, and boutique bars with carefully curated premium wines from around the world.
              </p>
              <p className="text-base leading-relaxed text-gray-600">
                Our partnerships with renowned wine producers ensure clients enjoy only the finest wines, supported by expert knowledge and reliable delivery across Bali's key hospitality destinations.
              </p>
            </motion.div>

            {/* Right - Features */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { title: "Premium Selection", desc: "Curated wines from France, Italy, Australia, and more." },
                { title: "Professional Service", desc: "Expert guidance for your wine program needs." },
                { title: "Nationwide Distribution", desc: "Reliable delivery across Indonesia." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5 transition-all hover:border-[#ed6a17]/30 hover:bg-white"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ed6a17] to-[#ed6a17]/80 shadow-lg shadow-[#ed6a17]/20">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-[#03143f] transition-colors group-hover:text-[#ed6a17]">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="scroll-mt-24 relative overflow-hidden border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        {/* Background with parallax layers */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{
            backgroundImage: "url('/bg-products.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#020b26]/80 via-[#020b26]/70 to-[#020b26]/90" />

        {/* Decorative gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#ed6a17]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#004aad]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
              Products
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">
              Our Wine Collection
            </h2>
          </motion.div>

          {/* Product Carousel */}
          <div
            className="product-carousel w-full max-w-full overflow-hidden py-4"
            aria-label="Wine categories by country"
          >
            <motion.div
              className="product-carousel-track flex gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {productCarousel.map((item, index) => (
                <Link
                  href={`/products/${item.flag}`}
                  key={`${item.country}-${index}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % products.length) * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative flex h-[390px] w-[16rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#020b26]/50 to-[#020b26]/80 p-8 backdrop-blur-xl transition-all duration-500 sm:w-[22rem] lg:w-[24rem]"
                  >
                    {/* Hover glow line */}
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-[#ed6a17] to-transparent opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100" />

                    {/* Badge */}
                    <div className="absolute right-6 top-6 rounded-full border border-[#ed6a17]/40 bg-[#ed6a17]/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-[#ed6a17]/90 backdrop-blur-sm">
                      Country
                    </div>

                    {/* Flag container */}
                    <motion.div
                      className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ed6a17]/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#ed6a17]/20"
                      whileHover={{
                        boxShadow: "0 0 30px rgba(237, 106, 23, 0.4)",
                      }}
                    >
                      <CountryFlag variant={item.flag} />
                    </motion.div>

                    <h3 className="mb-3 text-3xl font-semibold">
                      {item.country}
                    </h3>
                    <p className="mb-5 text-sm uppercase tracking-[0.22em] text-[#fff7ef]/45">
                      {item.region}
                    </p>
                    <p className="mb-8 leading-7 text-[#fff7ef]/60">
                      {item.highlight}
                    </p>

                    <motion.div className="mt-auto flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a17]">
                      Explore
                      <motion.span
                        className="flex items-center"
                        initial={{ gap: 8 }}
                        whileHover={{ gap: 12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={18} />
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* News */}
      <section
        id="news"
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ed6a17]/[0.02] via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
                News
              </p>
              <h2 className="font-cinzel text-3xl font-bold text-[#03143f] sm:text-4xl md:text-5xl">
                Latest Updates
              </h2>
            </div>

            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a17] transition-all hover:gap-3 hover:text-[#03143f]"
            >
              View All News
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={18} />
              </motion.span>
            </Link>
          </motion.div>

          {hasLoadedNews ? (
            newsItems.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Featured Article - Full Width */}
                <Link
                  href={`/news/${newsItems[0].slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl md:flex-row"
                >
                  <div className="relative aspect-[16/9] overflow-hidden md:w-1/2 lg:w-[60%]">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={newsItems[0].image || "/Hero.png"}
                        alt={newsItems[0].title}
                        fill
                        sizes="(min-width: 1024px) 60vw, 50vw"
                        className="object-cover"
                      />
                    </motion.div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020b26]/20 to-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-8 md:w-1/2 lg:w-[40%]">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-gray-400">
                      <span className="rounded-full bg-[#ed6a17]/10 px-3 py-1 font-medium uppercase tracking-wider text-[#ed6a17]">
                        {newsItems[0].category}
                      </span>
                      <span className="flex items-center gap-1.5 normal-case tracking-normal">
                        <Calendar size={14} />
                        {formatNewsDate(newsItems[0].publishedAt)}
                      </span>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold leading-tight text-[#03143f] transition-colors group-hover:text-[#ed6a17] md:text-3xl">
                      {newsItems[0].title}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-500">
                      {newsItems[0].excerpt}
                    </p>
                    <motion.span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#ed6a17]">
                      Read More
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight size={18} />
                      </motion.span>
                    </motion.span>
                  </div>
                </Link>

                {/* Secondary Articles - 2 Column Grid */}
                {newsItems.length > 1 && (
                  <div className="grid gap-6 md:grid-cols-2">
                    {newsItems.slice(1, 3).map((article) => (
                      <Link
                        href={`/news/${article.slug}`}
                        key={article.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                            className="h-full w-full"
                          >
                            <Image
                              src={article.image || "/Hero.png"}
                              alt={article.title}
                              fill
                              sizes="(min-width: 768px) 50vw, 100vw"
                              className="object-cover"
                            />
                          </motion.div>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="mb-3 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-gray-400">
                            <span className="rounded-full bg-[#ed6a17]/10 px-2 py-1 font-medium uppercase tracking-wider text-[#ed6a17]">
                              {article.category}
                            </span>
                            <span className="flex items-center gap-1.5 normal-case tracking-normal">
                              <Calendar size={14} />
                              {formatNewsDate(article.publishedAt)}
                            </span>
                          </div>
                          <h3 className="mb-3 text-lg font-bold leading-snug text-[#03143f] transition-colors group-hover:text-[#ed6a17]">
                            {article.title}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">
                            {article.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-gray-100 bg-gray-50 p-10 text-center text-gray-500">
                No news has been published yet.
              </div>
            )
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex h-64 animate-pulse md:h-48 border border-gray-100 bg-gray-50" />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-64 animate-pulse border border-gray-100 bg-gray-50" />
                <div className="h-64 animate-pulse border border-gray-100 bg-gray-50" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 lg:py-32">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src="/clients-video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020b26]/80 via-[#03143f]/70 to-[#020b26]/90" />
        </div>

        {/* Decorative elements */}
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#ed6a17]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#004aad]/20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-7xl"
        >
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
              Our Partners
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Trusted By Dozens of Clients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
              We proudly serve a diverse range of partners across the hospitality industry
            </p>
          </div>

          {/* Client Categories */}
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Hotels", desc: "5-star resorts & boutique hotels", count: "20+" },
              { name: "Restaurants", desc: "Fine dining & casual eateries", count: "30+" },
              { name: "Bars & Lounges", desc: "Cocktail bars & wine lounges", count: "15+" },
              { name: "Retail Partners", desc: "Wine shops & specialty stores", count: "10+" },
              { name: "Event Organizers", desc: "Corporate & private events", count: "8+" },
              { name: "Cafés", desc: "Artisan coffee & wine cafés", count: "12+" },
            ].map((client, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group flex cursor-pointer flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition-all hover:border-[#ed6a17]/50 hover:bg-white/10"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ed6a17] to-[#d55d0f] shadow-lg shadow-[#ed6a17]/30">
                  <span className="font-cinzel text-2xl font-bold text-white">{client.count}</span>
                </div>
                <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-[#ed6a17]">
                  {client.name}
                </h3>
                <p className="text-sm text-white/60">{client.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-[#ed6a17]/30 bg-gradient-to-r from-white/10 to-white/5 p-8 backdrop-blur-xl"
          >
            {/* Decorative line */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#ed6a17] to-transparent" />

            <h3 className="mb-3 text-xl font-bold text-white">Become Our Partner</h3>
            <p className="mb-6 text-white/60">
              Join our network of hospitality partners and experience premium wine distribution.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#ed6a17] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ed6a17]/30 transition-all hover:bg-[#d55d0f]"
            >
              Get In Touch <ChevronRight size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-white/10 bg-gradient-to-b from-[#020b26] to-[#03143f] px-5 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#ed6a17]">
            Contact
          </p>

          <h2 className="font-cinzel mb-8 text-4xl font-bold leading-tight text-gradient sm:text-5xl md:text-6xl">
            Let’s Work Together
          </h2>

          <p className="mx-auto mb-16 max-w-2xl text-lg leading-9 text-[#fff7ef]/60">
            Contact us for premium wine distribution partnerships tailored for
            hospitality and retail businesses.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <motion.a
              href="https://wa.me/6285157815688"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-[#ed6a17]/60 hover:bg-white/[0.07]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-5 text-[#ed6a17]"
              >
                <MessageCircle size={32} />
              </motion.div>
              <p className="font-medium text-[#fff7ef]/70">Message Us</p>
            </motion.a>

            <motion.a
              href="mailto:salesmeisindo@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-[#ed6a17]/60 hover:bg-white/[0.07]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-5 text-[#ed6a17]"
              >
                <Mail size={32} />
              </motion.div>
              <p className="break-all font-medium text-[#fff7ef]/70">salesmeisindo@gmail.com</p>
            </motion.a>

            <motion.a
              href="https://share.google/G77DFOaC4jW96aIh2"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-[#ed6a17]/60 hover:bg-white/[0.07]"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-5 text-[#ed6a17]"
              >
                <MapPin size={32} />
              </motion.div>
              <p className="font-medium text-[#fff7ef]/70">Open Google Maps</p>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Floating Contact Button */}
      <FloatingContact />

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

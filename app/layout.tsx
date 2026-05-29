import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import AgeVerification from "./components/AgeVerification";
import { generateJsonLd } from "@/lib/seo";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Meisindo Karya Semesta | Premium Wine Distributor",
  description:
    "Trusted premium wine distributor for hotels, restaurants, lounges, and hospitality businesses.",
  metadataBase: new URL("https://www.meisindobali.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meisindo Karya Semesta | Premium Wine Distributor",
    description:
      "Trusted premium wine distributor for hotels, restaurants, lounges, and hospitality businesses.",
    url: "https://www.meisindobali.com",
    siteName: "Meisindo Karya Semesta",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meisindo Karya Semesta | Premium Wine Distributor",
    description:
      "Trusted premium wine distributor for hotels, restaurants, lounges, and hospitality businesses.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = await generateJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <AgeVerification />
        {children}</body>
    </html>
  );
}

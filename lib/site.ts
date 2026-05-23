export const siteConfig = {
  name: "Meisindo Karya Semesta",
  shortName: "Meisindo",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL || "https://meisindo-profile.vercel.app",
  ),
  description:
    "Professional premium wine distributor serving hotels, restaurants, lounges, retail partners, and hospitality businesses in Indonesia.",
  keywords: [
    "wine distributor Indonesia",
    "premium wine distributor",
    "wine supplier for hotels",
    "wine supplier for restaurants",
    "HORECA wine supplier",
    "hospitality wine distributor",
    "wine portfolio Indonesia",
    "Meisindo Karya Semesta",
  ],
  email: "salesmeisindo@gmail.com",
  phone: "+6281999653330",
  addressCountry: "ID",
};

function normalizeSiteUrl(url: string) {
  const trimmedUrl = url.trim().replace(/\/$/, "");

  try {
    return new URL(trimmedUrl).origin;
  } catch {
    return "https://meisindo-profile.vercel.app";
  }
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Only redirect non-www to www
  if (hostname === "meisindobali.com" || hostname === "meisindo.com") {
    const url = request.nextUrl.clone();
    url.hostname = "www." + hostname;
    return NextResponse.redirect(url.toString(), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

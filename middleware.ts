import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Check if the request is to non-www domain
  if (hostname === "meisindobali.com" || hostname === "meisindo.com" || hostname === "www.meisindobali.com" || hostname === "www.meisindo.com") {
    // Redirect non-www to www
    if (!hostname.startsWith("www.")) {
      const url = request.nextUrl.clone();
      url.hostname = `www.${hostname}`;

      // Permanent 301 redirect
      return NextResponse.redirect(url.toString(), 301);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};

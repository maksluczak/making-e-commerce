import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  console.log("Middleware sprawdza ścieżkę:", pathname);

  if (
    (pathname.startsWith("/koszyk") || pathname.startsWith("/podsumowanie")) &&
    !token
  ) {
    console.log("BRAK TOKENA - Przekierowuję!");
    return NextResponse.redirect(new URL("/logowanie", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/koszyk/:path*", "/podsumowanie/:path*"],
};

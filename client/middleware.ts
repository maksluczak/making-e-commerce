import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token");
    const { pathname } = request.nextUrl;

    if (
        (pathname.startsWith("/koszyk") || pathname.startsWith("/podsumowanie")) &&
        !token
    ) {
        return NextResponse.redirect(new URL("/logowanie", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/koszyk/:path*", "/podsumowanie/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login")) {
    // Usuário autenticado não deve acessar o login
    if (token) {
      return NextResponse.redirect(new URL("/reservation", request.url));
    }
  } else {
    // Protege outras rotas
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/reservation/:path*", "/login", "/"],
};

import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const session = req.cookies.get("om_session")?.value

  // If logged in, never show auth pages
  if (pathname === "/signin" || pathname === "/signup") {
    if (session) {
      const url = req.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Protect dashboard: if not logged in, send to signin
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard/:path*"],
}


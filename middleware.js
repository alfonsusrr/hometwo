import { NextResponse } from "next/server";

export async function middleware(req, event) {
  const res = NextResponse.next()
  let { pathname, origin } = req.nextUrl

  const tokens = {
    accessToken: req.cookies.get("access_token"),
    refreshToken: req.cookies.get("refresh_token"),
    adminAccessToken: req.cookies.get("admin_access_token"),
    adminRefreshToken: req.cookies.get("admin_refresh_token")
  }
  
  if (pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin/')) {
      if (!tokens.adminAccessToken && !tokens.adminRefreshToken) {
        return NextResponse.redirect(`${origin}/admin`)
      }
    }
  } else if (pathname.startsWith("/owner")) {
    if (!tokens.accessToken && !tokens.refreshToken) {
      return NextResponse.redirect(`${origin}/home`)
    }
  } else if (pathname === "/home" || pathname.startsWith("/rooms")) {
    if (!tokens.accessToken && !tokens.refreshToken) {
      return res
    } 
  }
  return res
}

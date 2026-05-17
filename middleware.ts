import { type NextRequest, NextResponse } from 'next/server'

// Passthrough middleware — Supabase session refresh wired in once auth is live
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

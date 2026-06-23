import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'supersecret_jwt_key_for_dev';
const key = new TextEncoder().encode(secretKey);

export default async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  
  // Protect all routes except /login and /register
  if (!session && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session) {
    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: ['HS256'],
      });
      
      const user = payload.user as any;

      // If logged in and trying to access auth pages, redirect to dashboard
      if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Invalid token
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// Simple middleware to protect specific routes
export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // No token found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Verify JWT - using sync version for simplicity
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    verify(token, JWT_SECRET);
    
    // Token is valid, allow request
    return NextResponse.next();
  } catch (error) {
    // Token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Only run middleware on protected routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/api/protected/:path*'],
};
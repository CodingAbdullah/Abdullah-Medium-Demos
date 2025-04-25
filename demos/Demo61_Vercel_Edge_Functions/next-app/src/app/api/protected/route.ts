// app/api/protected/data/route.ts
// This route is protected by the middleware

import { NextResponse } from 'next/server';

export async function GET() {
  // If middleware passes, this code runs
  // The middleware has already verified the JWT

  return NextResponse.json({
    message: 'This is protected data',
    timestamp: new Date().toISOString(),
    data: {
      items: [
        { id: 1, name: 'Protected Item 1' },
        { id: 2, name: 'Protected Item 2' },
        { id: 3, name: 'Protected Item 3' }
      ]
    }
  });
}
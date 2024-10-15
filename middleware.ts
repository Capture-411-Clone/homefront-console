import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Retrieve the API key from the request headers
  const apiKey = request.headers.get('Authorization');
  const secretKey = process.env.API_SECRET_KEY;

  // Check if the API key matches the secret key
  if (apiKey !== secretKey) {
    // If the keys do not match, return a 401 Unauthorized response
    return new Response('Unauthorized', { status: 401 });
  }

  // If the keys match, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: '/api/emails/:path*',
};

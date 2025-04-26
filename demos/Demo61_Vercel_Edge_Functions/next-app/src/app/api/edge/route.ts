// Simple example of working with a Vercel Edge Function
export const runtime = 'edge';

// Geo-location is encoded in each request using a Vercel Edge function
export async function GET(request: Request) {
  const { country } = request.geo; // Edge provides geo data
  
  return Response.json({
    message: `Hello from ${country}!`
  });
}
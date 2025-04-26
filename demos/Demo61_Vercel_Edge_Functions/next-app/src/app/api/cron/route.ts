import { NextResponse } from 'next/server';

// Simple GET route for handling a CRON job
// Designate to be run every * 5 * * 5
export async function GET() {
  try {
    console.log('CRON job executed at:', new Date().toISOString());
    
    // If successful, return response
    return NextResponse.json({ 
      success: true, 
      message: 'CRON job executed successfully',
      timestamp: new Date().toISOString()
    });
  } 
  catch (error) {
    // If error, return error
    return NextResponse.json({ 
      success: false, 
      message: 'CRON job failed' 
    }, { status: 500 });
  }
}
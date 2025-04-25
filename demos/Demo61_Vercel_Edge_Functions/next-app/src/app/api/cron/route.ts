// app/api/cron/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Route handler for cron jobs
export async function GET(request: Request) {
  const headersList = headers();
  
  // Check for a secret authorization header to secure the endpoint
  // This can be a header sent by your cron service like Vercel Cron
  const authHeader = headersList.get('authorization');
  const isAuthenticated = authHeader === `Bearer ${process.env.CRON_SECRET_KEY}`;
  
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Execute your cron job logic here
    await runCronTask();
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Cron job executed successfully',
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Cron job failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Cron job execution failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Function that contains your cron job logic
async function runCronTask() {
  console.log('Running cron job at:', new Date().toISOString());
  
  // Example task: Clean expired sessions from database
  // await db.expiredSessions.deleteMany({ expiresAt: { lt: new Date() } });
  
  // Example task: Generate reports
  // await generateDailyReports();
  
  // Example task: Send scheduled emails
  // await sendScheduledEmails();
  
  // Add your own custom logic here
  
  return { success: true };
}
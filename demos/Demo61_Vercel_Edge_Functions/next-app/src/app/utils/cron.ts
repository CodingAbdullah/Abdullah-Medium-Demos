// lib/cron-utils.ts
import { NextRequest } from 'next/server';

/**
 * Validates if a request is a legitimate cron job request
 * @param request The Next.js request object
 * @returns Boolean indicating if request is authenticated
 */
export function isValidCronRequest(request: NextRequest): boolean {
  // Get the authorization header
  const authHeader = request.headers.get('authorization');
  
  // Check if the authorization header matches your secret key
  const isAuthenticated = authHeader === `Bearer ${process.env.CRON_SECRET_KEY}`;
  
  // Optionally verify the request comes from a trusted IP range
  // This depends on your cron service provider
  
  return isAuthenticated;
}

/**
 * Logs cron job execution details
 * @param jobName Name of the cron job
 * @param status Success or error status
 * @param details Additional details about the execution
 */
export async function logCronExecution(
  jobName: string,
  status: 'success' | 'error',
  details?: any
): Promise<void> {
  // Log to console for development and monitoring
  console.log(`Cron job ${jobName} executed with status: ${status}`);
  
  // Optional: Store execution logs in database
  // await db.cronLogs.create({
  //   data: {
  //     jobName,
  //     status,
  //     details: details ? JSON.stringify(details) : null,
  //     executedAt: new Date()
  //   }
  // });
  
  // Optional: Send alert on failure
  if (status === 'error' && process.env.NODE_ENV === 'production') {
    // Send notification via email, SMS, or monitoring service
    // await sendAlert(`Cron job ${jobName} failed: ${details?.message || 'Unknown error'}`);
  }
}
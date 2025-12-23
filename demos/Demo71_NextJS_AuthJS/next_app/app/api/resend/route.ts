import EmailTemplate from '@/app/_components/EmailTemplate';
import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// Handle POST requests to resend verification email
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email } = body;

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Test Email from Resend',
      react: EmailTemplate({ firstName, lastName })
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  }
  catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
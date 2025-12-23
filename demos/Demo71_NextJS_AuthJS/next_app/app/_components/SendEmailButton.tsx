'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from './ui/button';

// Custom client Send Email button using the Shadcn/ui button component
// Processing request for sending email via /api/resend
export default function SendEmailButton() {
  const { user } = useUser();
  const [isSending, setIsSending] = useState(false);

  // Function for sending email using payload to /api/resend
  const handleSendEmail = async () => {
    setIsSending(true);

    try {
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user?.emailAddresses[0]?.emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName
        })
      })

      if (!response.ok) {
        const error = await response.json();
        alert('Failed to send email');
        
        return
      }

      alert('Email sent successfully!');
    }
    catch (error) {
      alert('An error occurred while sending email');
    } 
    finally {
      setIsSending(false);
    }
  }

  // Conditionally rendering button text based on request status
  return (
    <Button
      onClick={handleSendEmail}
      disabled={isSending}
      className="w-full bg-[#00ff41] text-black px-8 py-3 rounded font-bold text-lg shadow-[0_0_15px_rgba(0,255,65,0.5)] hover:bg-[#00cc33] transition-all border border-[#00ff41] h-auto disabled:opacity-50 disabled:cursor-not-allowed"
      size="lg"
    >
      {isSending ? 'SENDING EMAIL...' : 'SEND EMAIL'}
    </Button>
  )
}

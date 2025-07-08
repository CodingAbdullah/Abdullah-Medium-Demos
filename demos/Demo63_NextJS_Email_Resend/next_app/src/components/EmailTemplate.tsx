import * as React from 'react';

// Custom EmailTemplate Data Type
interface EmailTemplateProps {
  emailAddress: string,
  tokenID: string
}

// EmailTemplate Custom Component
export function EmailTemplate({ emailAddress, tokenID }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome {emailAddress}!</h1>
      <p>The following is your verification ID for resetting your account password: <b>{ tokenID }</b></p>
    </div>
  );
}
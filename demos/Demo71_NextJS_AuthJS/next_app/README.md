# Matrix Auth Portal - Clerk.js with Next.js App Router

A simple, Matrix-themed authentication setup using Clerk.js and Next.js 15 App Router with webhook support.

## Features

- **Sign In Page** - Fully styled authentication page
- **Sign Up Page** - User registration with Matrix theme
- **Sign Out** - Via UserButton in header
- **User Profile Display** - Shows authenticated user information
- **Webhook Support** - Capture user events in real-time
- **Matrix Theme** - Neon green (#00ff41) on black background

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Clerk.js** - Authentication and user management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Svix** - Webhook verification

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your API keys from the dashboard

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

See `.env.example` for a template.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
next_app/
├── app/
│   ├── api/
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts          # Webhook endpoint
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx              # Sign in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx              # Sign up page
│   ├── layout.tsx                    # Root layout with ClerkProvider
│   ├── page.tsx                      # Home page (shows user info)
│   └── globals.css                   # Global styles
├── .env.local                        # Environment variables (create this)
├── .env.example                      # Environment variables template
├── WEBHOOK_SETUP.md                  # Detailed webhook guide
└── README.md                         # This file
```

## Pages

### Home Page (`/`)

- Shows "ACCESS_DENIED" when signed out with Sign In/Sign Up buttons
- Shows "ACCESS_GRANTED" when signed in with user information:
  - User ID
  - Name
  - Email
  - Created date
  - Last sign-in date

### Sign In Page (`/sign-in`)

- Clerk's pre-built sign-in component
- Styled with Matrix theme
- Supports email/password and OAuth providers

### Sign Up Page (`/sign-up`)

- Clerk's pre-built sign-up component
- Styled with Matrix theme
- Collects email, password, and name

## Webhook Setup

The webhook endpoint captures user events in real-time. See [WEBHOOK_SETUP.md](./WEBHOOK_SETUP.md) for detailed instructions.

### Quick Webhook Setup

1. **Create webhook endpoint in Clerk Dashboard**
   - Go to Dashboard > Webhooks > Add Endpoint
   - URL: `https://yourdomain.com/api/webhooks/clerk`

2. **Select events to listen to**
   - user.created
   - user.updated
   - user.deleted
   - session.created
   - session.ended

3. **Copy webhook secret**
   - Add to `.env.local` as `CLERK_WEBHOOK_SECRET`

4. **Test locally with ngrok**
   ```bash
   ngrok http 3000
   # Use ngrok URL in Clerk Dashboard
   ```

### Webhook Events Handled

The webhook endpoint at `app/api/webhooks/clerk/route.ts` handles:

- ✅ `user.created` - New user signup
- ✅ `user.updated` - Profile updates
- ✅ `user.deleted` - Account deletion
- ✅ `session.created` - User login
- ✅ `session.ended` - User logout

### Common Use Cases

Add your custom logic in the webhook handler:

```typescript
case 'user.created':
  // Save user to database
  await prisma.user.create({
    data: {
      clerkUserId: evt.data.id,
      email: evt.data.email_addresses[0]?.email_address,
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
    }
  })
  break
```

## Customization

### Theme Colors

The Matrix theme uses these colors (defined in `app/layout.tsx`):

- **Primary**: `#00ff41` (Neon Green)
- **Secondary**: `#00cc33` (Darker Green)
- **Background**: `#000000` / `#0a0a0a` (Black)
- **Font**: `monospace`

### Modify ClerkProvider Appearance

Edit `app/layout.tsx` to customize the theme:

```typescript
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: '#00ff41',    // Change primary color
      colorBackground: '#0a0a0a', // Change background
      // ... more customization
    }
  }}
>
```

### Add More OAuth Providers

Enable in Clerk Dashboard:
- Google
- GitHub
- Microsoft
- Discord
- And more...

## Access User Information

### In Server Components

```typescript
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()
  
  return (
    <div>
      <p>Hello, {user?.firstName}!</p>
    </div>
  )
}
```

### In Client Components

```typescript
'use client'

import { useUser } from '@clerk/nextjs'

export default function Profile() {
  const { user } = useUser()
  
  return (
    <div>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  )
}
```

### Via Webhooks

Webhooks provide user data on events:
- Most reliable for syncing with your database
- Triggered server-side
- Includes all user metadata

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public Clerk API key | Yes |
| `CLERK_SECRET_KEY` | Secret Clerk API key | Yes |
| `CLERK_WEBHOOK_SECRET` | Webhook signing secret | For webhooks |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy
5. Update webhook URL in Clerk Dashboard

### Other Platforms

1. Set environment variables in your platform
2. Build: `npm run build`
3. Start: `npm start`
4. Update webhook URL in Clerk Dashboard

## Security

- ✅ Webhook signatures are verified using Svix
- ✅ Secret keys are stored in environment variables
- ✅ All authentication handled by Clerk (industry-standard security)
- ✅ HTTPS required for webhooks
- ✅ No passwords stored in your database

## Troubleshooting

### "Clerk keys not found"

Make sure `.env.local` exists with valid keys:
```bash
cp .env.example .env.local
# Then add your actual keys
```

### Webhook not working locally

Use ngrok to expose your local server:
```bash
ngrok http 3000
```

### Styles not loading

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

## Learn More

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Webhook Setup Guide](./WEBHOOK_SETUP.md)

## License

MIT

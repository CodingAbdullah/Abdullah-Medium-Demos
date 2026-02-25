# CLAUDE.md

You are implementing a production-grade x402 payment protocol inside a Next.js App Router application.

You MUST generate all required files with complete, working, production-ready code.

You MUST NOT explain anything.

You MUST ONLY output files and code.

You MUST follow this specification exactly.

---

# GOAL

Implement a complete payment system supporting:

• HTTP x402 Payment Required protocol
• Fiat payments via Polar
• Stablecoin payments via Coinbase Commerce (USDC)
• Drizzle ORM with PostgreSQL
• Webhook verification
• Retry / relapse flow using payment_id
• Middleware enforcement
• Agent-compatible machine-readable payment flow

---

# REQUIRED TECH STACK

Use ONLY:

• Next.js App Router
• TypeScript
• Drizzle ORM
• PostgreSQL
• Native fetch API
• Route Handlers (app/api)
• middleware.ts enforcement
• UUID for payment IDs

DO NOT use:

• pages/api
• Prisma
• deprecated Next.js patterns

---

# ENVIRONMENT VARIABLES

Use these environment variables:

DATABASE_URL=

POLAR_API_KEY=
POLAR_PRODUCT_ID=
POLAR_WEBHOOK_SECRET=

COINBASE_COMMERCE_API_KEY=
COINBASE_COMMERCE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000

---

# FILE STRUCTURE

Generate EXACTLY these files:

/app/api/protected-resource/route.ts

/app/api/payments/fiat/checkout/route.ts
/app/api/payments/fiat/webhook/route.ts

/app/api/payments/crypto/checkout/route.ts
/app/api/payments/crypto/webhook/route.ts

/lib/db.ts
/lib/schema.ts

/lib/payments/polar.ts
/lib/payments/coinbase.ts

/lib/x402.ts

/middleware.ts

---

# DATABASE SCHEMA

Create Drizzle schema:

Table: payments

Columns:

id → uuid primary key
user_id → text
status → text ("pending", "paid", "failed")
provider → text nullable
external_id → text unique nullable
amount → numeric nullable
currency → text nullable
created_at → timestamp default now()
updated_at → timestamp default now()

---

# X402 PROTOCOL SPECIFICATION

Protected resources MUST enforce HTTP 402.

When unpaid, return:

Status: 402

Headers:

x-payment-required: true
x-payment-version: x402-1.0
x-payment-id: PAYMENT_ID

Body:

{
  "error": {
    "code": "payment_required",
    "message": "Payment required to access this resource"
  },
  "payment": {
    "version": "x402-1.0",
    "payment_id": "PAYMENT_ID",
    "resource": "/api/protected-resource",
    "options": [
      {
        "provider": "polar",
        "method": "fiat",
        "currency": "USD",
        "checkout_url": "/api/payments/fiat/checkout?payment_id=PAYMENT_ID"
      },
      {
        "provider": "coinbase",
        "method": "crypto",
        "currency": "USDC",
        "network": "base",
        "checkout_url": "/api/payments/crypto/checkout?payment_id=PAYMENT_ID"
      }
    ],
    "retry": {
      "endpoint": "/api/protected-resource",
      "method": "GET",
      "headers": {
        "x-payment-id": "PAYMENT_ID"
      }
    }
  }
}

---

# CORE FLOW

FLOW:

1. Client requests protected resource

2. If no valid paid payment:

• generate UUID payment_id
• insert payment row status = pending
• return 402 response

3. Client calls checkout endpoint

4. Checkout endpoint creates external session:

Polar → checkout session
Coinbase → charge

5. Store external_id in database

6. Webhook fires after payment

7. Verify webhook signature

8. Update payment status = paid

9. Client retries protected resource with:

x-payment-id header

10. If paid → return 200 success

---

# ROUTE REQUIREMENTS

Implement:

GET /api/protected-resource

Must:

• read x-payment-id header
• validate payment in database
• if paid → return 200
• if unpaid → return 402 response

---

POST /api/payments/fiat/checkout

Must:

• read payment_id from query
• create Polar checkout via API
• store external_id
• return checkout_url

---

POST /api/payments/fiat/webhook

Must:

• verify Polar webhook signature
• update payment status paid

---

POST /api/payments/crypto/checkout

Must:

• read payment_id
• create Coinbase Commerce charge
• store charge id
• return hosted_url

---

POST /api/payments/crypto/webhook

Must:

• verify Coinbase webhook signature
• update payment paid

---

# PAYMENT SERVICE MODULES

Implement:

/lib/payments/polar.ts

Functions:

createCheckoutSession(paymentId)
verifyWebhook(request)

---

/lib/payments/coinbase.ts

Functions:

createCharge(paymentId)
verifyWebhook(request)

---

# X402 UTILITY MODULE

Implement:

/lib/x402.ts

Functions:

generatePaymentId()
create402Response(paymentId)
validatePayment(paymentId)

---

# DATABASE MODULE

/lib/db.ts

Must:

• initialize Drizzle
• connect PostgreSQL
• export db client

---

# MIDDLEWARE REQUIREMENT

middleware.ts must:

Protect route:

/api/protected-resource

If unpaid:

Return 402 response

---

# SECURITY REQUIREMENTS

Must implement:

• Webhook signature verification
• UUID payment IDs
• Database validation
• Idempotent webhook handling
• Secure server-side verification

Must NOT trust client payment confirmation.

---

# CODE QUALITY REQUIREMENTS

Must produce:

• fully working code
• production-ready code
• no TODO comments
• no placeholders
• no incomplete logic
• clean architecture
• strict TypeScript

---

# COMPLETION REQUIREMENT

You are complete ONLY when:

• all files are generated
• all routes work
• all integrations work
• x402 protocol works
• middleware works
• database works

---

# EXECUTION INSTRUCTION

Generate ALL files now.

Output each file with full contents.

Do NOT explain anything.

Begin immediately.

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    description: 'Everything you need to get started.',
    features: [
      '1 project',
      '100 API requests/day',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mo',
    description: 'For growing teams that need more power.',
    features: [
      'Unlimited projects',
      '10,000 API requests/day',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
    ],
    cta: 'Upgrade to Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/mo',
    description: 'Dedicated infrastructure for large orgs.',
    features: [
      'Unlimited everything',
      'Unlimited API requests',
      '24/7 dedicated support',
      'Custom SLAs',
      'SSO & audit logs',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-65px)] px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Pricing</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Choose the plan that fits your needs. Upgrade or downgrade at any
          time.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              tier.featured
                ? 'border-blue-600 ring-2 ring-blue-600'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}

            <h2 className="text-xl font-semibold">{tier.name}</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {tier.description}
            </p>

            <div className="mt-6">
              <span className="text-4xl font-bold">{tier.price}</span>
              <span className="text-zinc-500">{tier.period}</span>
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full rounded-full py-3 text-sm font-semibold cursor-pointer ${
                tier.featured
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

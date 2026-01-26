// Plans data for subscription tiers
const Plans = {
    free: {
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "24-hour support response time",
        "1GB storage",
        "Community access"
      ]
    },
    basic: {
      name: "Basic",
      description: "Great for growing teams",
      monthlyPrice: 15,
      annualPrice: 120,
      annualSavings: "33%",
      features: [
        "Up to 10 projects",
        "Advanced analytics",
        "4-hour support response time",
        "10GB storage",
        "Priority community access",
        "API access",
        "Custom integrations"
      ],
      popular: false
    },
    pro: {
      name: "Pro",
      description: "For scaling businesses",
      monthlyPrice: 30,
      annualPrice: 288,
      annualSavings: "20%",
      features: [
        "Unlimited projects",
        "Real-time analytics",
        "1-hour support response time",
        "100GB storage",
        "Dedicated account manager",
        "Advanced API access",
        "Custom integrations",
        "SSO authentication",
        "Audit logs"
      ],
      popular: true
    }
};

export default Plans;
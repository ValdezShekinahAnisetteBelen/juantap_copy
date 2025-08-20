import { PricingCard } from "@/components/blocks/pricing-card"

const pricingPlans = [
  {
    name: "Free Templates",
    description: "Perfect for getting started",
    price: "Free",
    priceColor: "text-green-600",
    features: [
      "2+ Beautiful Templates",
      "Basic Customization",
      "QR Code Generation",
      "Social Media Links",
      "Mobile Responsive",
    ],
    buttonText: "Start Free",
    buttonVariant: "outline" as const,
    buttonClass: "bg-transparent",
  },
  {
    name: "Premium Templates",
    description: "Stand out with exclusive designs",
    price: "₱299",
    priceSubtext: "one-time payment per template",
    priceColor: "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
    features: [
      "20+ Exclusive Templates",
      "Advanced Customization",
      "Custom Backgrounds",
      "Premium Animations",
      "Priority Support",
    ],
    buttonText: "Unlock Premium",
    buttonVariant: "default" as const,
    buttonClass: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    badge: "Most Popular",
    borderClass: "border-2 border-purple-300 hover:border-purple-400",
    iconColor: "text-purple-500",
  },
]

export function TemplatesSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Template Style</h2>
          <p className="text-xl text-gray-600">Free templates to get started, premium designs to stand out</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { FeatureCard } from "@/components/blocks/feature-card"
import { QrCode, Palette, Share2, Smartphone, Users, Crown } from "lucide-react"

const features = [
  {
    icon: QrCode,
    title: "QR Code & NFC Sharing",
    description:
      "Instantly share your profile with QR codes or NFC tap. Perfect for business cards and networking events.",
    color: "blue",
  },
  {
    icon: Palette,
    title: "Custom Design Templates",
    description: "Choose from beautiful templates and customize colors, fonts, backgrounds to match your brand.",
    color: "purple",
  },
  {
    icon: Share2,
    title: "Social Media Integration",
    description: "Connect all your social platforms - Instagram, LinkedIn, TikTok, WhatsApp, and more in one place.",
    color: "green",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Your profiles look perfect on any device. Responsive design ensures great user experience everywhere.",
    color: "orange",
  },
  {
    icon: Users,
    title: "Analytics & Insights",
    description: "Track profile views, link clicks, and engagement to understand your digital presence impact.",
    color: "pink",
  },
  {
    icon: Crown,
    title: "Premium Templates",
    description: "Unlock exclusive premium designs and advanced customization options for a unique look.",
    color: "indigo",
  },
] as const

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Digital Networking</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to create, customize, and share your digital presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

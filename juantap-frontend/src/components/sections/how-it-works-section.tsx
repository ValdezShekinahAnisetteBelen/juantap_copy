import { StepCard } from "@/components/blocks/step-card"

const steps = [
  {
    step: 1,
    title: "Create Your Profile",
    description: "Sign up and add your personal information, bio, and profile picture to get started.",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    step: 2,
    title: "Customize & Add Links",
    description: "Choose a template and add all your social media and contact links.",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    step: 3,
    title: "Share & Connect",
    description: "Generate your QR code and start sharing your digital profile with the world instantly.",
    gradient: "from-pink-600 to-red-600",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-xl text-gray-600">Create your digital profile in minutes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}

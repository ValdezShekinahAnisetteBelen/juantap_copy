import { cn } from "@/lib/utils"

interface StepCardProps {
  step: number
  title: string
  description: string
  gradient: string
}

export function StepCard({ step, title, description, gradient }: StepCardProps) {
  return (
    <div className="text-center">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 bg-gradient-to-r",
          gradient,
        )}
      >
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

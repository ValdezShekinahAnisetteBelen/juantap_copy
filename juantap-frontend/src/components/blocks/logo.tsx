import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "light" | "dark"
  className?: string
}

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">JT</span>
      </div>
      <span
        className={cn(
          "text-xl font-bold",
          variant === "light"
            ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            : "text-white",
        )}>
        JuanTap
      </span>

    </div>
  )
}

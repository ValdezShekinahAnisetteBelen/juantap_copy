import { Badge } from "@/components/ui/badge"
import { Palette, Crown, Sparkles } from 'lucide-react'

export function TemplateHeader() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
          <Palette className="w-3 h-3 mr-1" />
          Premium Templates
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          Stand Out with+
          <br />
          Premium Designs
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Choose from our collection of professionally designed templates. From minimalist to bold, find the perfect
          style that represents your unique personality and brand.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border">
            <Crown className="w-4 h-4 text-yellow-600" />
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Unique Designs</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border">
            <Palette className="w-4 h-4 text-blue-600" />
            <span>Fully Customizable</span>
          </div>
        </div>
      </div>
    </section>
  )
}

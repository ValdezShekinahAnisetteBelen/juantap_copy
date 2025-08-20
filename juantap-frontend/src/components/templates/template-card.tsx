import type { Template } from "@/lib/template-data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Download, Eye, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const isPremium = template.category === "premium"
  const hasDiscount = template.originalPrice && template.discount
  const [showRealPreview, setShowRealPreview] = useState(false)

  // Lazy load preview component in background after mount
  const LazyPreview = template.previewComponent
    ? dynamic(() => Promise.resolve(template.previewComponent), {
        ssr: false,
      })
    : null

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRealPreview(true)
    }, 800) // small delay to keep initial load light
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <div className="relative">
        {/* Template Preview or Thumbnail */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          {showRealPreview && LazyPreview ? (
            <LazyPreview />
          ) : (
            <img
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              className="w-full h-full object-cover blur-sm scale-105"
            />
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isPremium && (
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
          {template.isNew && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          )}
          {template.isPopular && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="bg-red-500">
              -{template.discount}%
            </Badge>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <Link href={`/templates/${template.id}`}>
              <Button size="sm" variant="secondary">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Download className="w-3 h-3" />
            {template.downloads.toLocaleString()}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {isPremium ? (
              <div className="flex items-center gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">₱{template.price}</span>
                    <span className="text-sm text-gray-500 line-through">₱{template.originalPrice}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">₱{template.price}</span>
                )}
              </div>
            ) : (
              <span className="text-lg font-bold text-green-600">Free</span>
            )}
          </div>

          <Link href={`/templates/${template.id}`}>
            <Button size="sm" className={isPremium ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}>
              {isPremium ? "Get Premium" : "Use Free"}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

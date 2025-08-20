import { MinimalClean } from "@/components/template-previews/minimal-clean"
import { GradientModern } from "@/components/template-previews/gradient-modern"
import { ClassicBlue } from "@/components/template-previews/classic-blue"
import { NeonCyber } from "@/components/template-previews-premium/neon-cyber";
import { LuxuryGold } from "@/components/template-previews-premium/luxury-gold";
import { NatureOrganic } from "@/components/template-previews-premium/nature-organic";
import { RetroVintage } from "@/components/template-previews-premium/retro-vintage";
import { GlassMorphism } from "@/components/template-previews-premium/glass-morphism";
import { MinimalistPro } from "@/components/template-previews-premium/minimalist-pro";

export interface Template {
  id: string
  name: string
  description: string
  category: "free" | "premium"
  price: number
  originalPrice?: number
  discount?: number
   previewComponent: React.ComponentType;
  thumbnail: string
  features: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  layout: "minimal" | "modern" | "creative" | "professional" | "artistic"
  tags: string[]
  isPopular?: boolean
  isNew?: boolean
  createdAt: string
  downloads: number
}

const templates: Template[] = [

  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "A clean and simple design perfect for professionals who prefer minimalism.",
    category: "free",
    price: 0,
    previewComponent: MinimalClean,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: ["Clean Layout", "Social Links", "Contact Info", "QR Code", "Mobile Responsive"],
    colors: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#111827",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    layout: "minimal",
    tags: ["minimal", "clean", "professional", "simple"],
    createdAt: "2024-01-01",
    downloads: 2847,
  },
  {
    id: "gradient-modern",
    name: "Gradient Modern",
    description: "Modern gradient design with vibrant colors and smooth transitions.",
    category: "free",
    price: 0,
    previewComponent: GradientModern,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: ["Gradient Background", "Modern Layout", "Social Integration", "QR Code", "Animations"],
    colors: {
      primary: "#667eea",
      secondary: "#764ba2",
      accent: "#f093fb",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      text: "#ffffff",
    },
    fonts: {
      heading: "Poppins",
      body: "Inter",
    },
    layout: "modern",
    tags: ["gradient", "modern", "colorful", "vibrant"],
    createdAt: "2024-01-15",
    downloads: 1923,
  },
  {
    id: "classic-blue",
    name: "Classic Blue",
    description: "Professional blue theme perfect for business professionals and corporate use.",
    category: "free",
    price: 0,
    previewComponent: ClassicBlue,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: ["Professional Design", "Blue Theme", "Business Cards", "Contact Forms", "Analytics"],
    colors: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#60a5fa",
      background: "#f8fafc",
      text: "#1e293b",
    },
    fonts: {
      heading: "Roboto",
      body: "Open Sans",
    },
    layout: "professional",
    tags: ["blue", "professional", "business", "corporate"],
    createdAt: "2024-02-01",
    downloads: 1654,
  },

  // Premium Templates
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Futuristic neon design with cyberpunk aesthetics and glowing effects.",
    category: "premium",
    price: 299,
    previewComponent: NeonCyber,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: [
      "Neon Glowing Effects",
      "Animated Background",
      "Custom Particles",
      "Sound Effects",
      "Dark Mode",
      "Advanced Animations",
    ],
    colors: {
      primary: "#00ffff",
      secondary: "#ff00ff",
      accent: "#ffff00",
      background: "#0a0a0a",
      text: "#ffffff",
    },
    fonts: {
      heading: "Orbitron",
      body: "Rajdhani",
    },
    layout: "creative",
    tags: ["neon", "cyberpunk", "futuristic", "dark", "glowing"],
    isPopular: true,
    isNew: true,
    createdAt: "2024-03-01",
    downloads: 456,
  },
  {
    id: "luxury-gold",
    name: "Luxury Gold",
    description: "Elegant gold and black design for luxury brands and high-end professionals.",
    category: "premium",
    price: 399,
    originalPrice: 499,
    discount: 20,
    previewComponent: LuxuryGold,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: [
      "Gold Foil Effects",
      "Luxury Typography",
      "Premium Animations",
      "Video Background",
      "Custom Branding",
      "VIP Support",
    ],
    colors: {
      primary: "#d4af37",
      secondary: "#ffd700",
      accent: "#ffed4e",
      background: "#000000",
      text: "#ffffff",
    },
    fonts: {
      heading: "Playfair Display",
      body: "Lato",
    },
    layout: "artistic",
    tags: ["luxury", "gold", "elegant", "premium", "sophisticated"],
    isPopular: true,
    createdAt: "2024-02-15",
    downloads: 234,
  },
  {
    id: "nature-organic",
    name: "Nature Organic",
    description: "Earth-toned design inspired by nature with organic shapes and textures.",
    category: "premium",
    price: 249,
    previewComponent: NatureOrganic,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: [
      "Organic Shapes",
      "Nature Textures",
      "Earth Tones",
      "Leaf Animations",
      "Eco-friendly Theme",
      "Sustainability Focus",
    ],
    colors: {
      primary: "#22c55e",
      secondary: "#16a34a",
      accent: "#84cc16",
      background: "#f0fdf4",
      text: "#14532d",
    },
    fonts: {
      heading: "Merriweather",
      body: "Source Sans Pro",
    },
    layout: "creative",
    tags: ["nature", "organic", "green", "eco", "sustainable"],
    createdAt: "2024-02-28",
    downloads: 189,
  },
  {
    id: "retro-vintage",
    name: "Retro Vintage",
    description: "Nostalgic 80s-inspired design with retro colors and vintage typography.",
    category: "premium",
    price: 279,
    previewComponent: RetroVintage,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: [
      "80s Aesthetics",
      "Retro Animations",
      "Vintage Typography",
      "Neon Outlines",
      "Synthwave Colors",
      "Nostalgic Effects",
    ],
    colors: {
      primary: "#ff6b9d",
      secondary: "#c44569",
      accent: "#f8b500",
      background: "#2d1b69",
      text: "#ffffff",
    },
    fonts: {
      heading: "Righteous",
      body: "Nunito",
    },
    layout: "creative",
    tags: ["retro", "vintage", "80s", "synthwave", "nostalgic"],
    isNew: true,
    createdAt: "2024-03-10",
    downloads: 167,
  },
  {
    id: "glass-morphism",
    name: "Glass Morphism",
    description: "Modern glassmorphism design with frosted glass effects and blur backgrounds.",
    category: "premium",
    price: 329,
    previewComponent: GlassMorphism,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: [
      "Glassmorphism Effects",
      "Frosted Glass",
      "Backdrop Blur",
      "Translucent Elements",
      "Modern Aesthetics",
      "iOS-inspired Design",
    ],
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      text: "#1f2937",
    },
    fonts: {
      heading: "SF Pro Display",
      body: "SF Pro Text",
    },
    layout: "modern",
    tags: ["glassmorphism", "modern", "blur", "translucent", "ios"],
    isPopular: true,
    createdAt: "2024-03-05",
    downloads: 312,
  },
  {
    id: "minimalist-pro",
    name: "Minimalist Pro",
    description: "Ultra-clean minimalist design with perfect typography and spacing.",
    category: "premium",
    price: 199,
    previewComponent: MinimalistPro,
    thumbnail: "/placeholder.svg?height=300&width=200",
    features: [
      "Ultra-clean Design",
      "Perfect Typography",
      "Golden Ratio Layout",
      "Micro-interactions",
      "Accessibility Focus",
      "Performance Optimized",
    ],
    colors: {
      primary: "#000000",
      secondary: "#6b7280",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#111827",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    layout: "minimal",
    tags: ["minimalist", "clean", "typography", "professional", "accessible"],
    createdAt: "2024-02-20",
    downloads: 445,
  },
]


export async function getAllTemplates(): Promise<Template[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return templates
}

export async function getTemplateById(id: string): Promise<Template | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return templates.find((template) => template.id === id) || null
}

export async function getFreeTemplates(): Promise<Template[]> {
  return templates.filter((template) => template.category === "free")
}

export async function getPremiumTemplates(): Promise<Template[]> {
  return templates.filter((template) => template.category === "premium")
}
export { templates }

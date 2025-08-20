import { Header } from "@/components/layout/header"
import { TemplateHeader } from "@/components/templates/template-header"
import TemplateGalleryServer from "@/components/templates/template-gallery-server"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  // Auth info (not used yet in this snippet, but you can pass it to Header if needed)
  const isAuthenticated = true
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
        <TemplateHeader />
        {/* Fetches templates server-side, passes them to the gallery */}
        <TemplateGalleryServer />
      </main>
      <Footer />
    </div>
  )
}

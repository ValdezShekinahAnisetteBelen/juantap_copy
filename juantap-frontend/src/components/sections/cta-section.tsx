import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Digital Identity?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of users who are already networking smarter with JuanTap. Create your profile in minutes and
          start sharing instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/templates">
            <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-purple-600 hover:bg-gray-100">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/templates/minimal-clean">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              View Examples
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

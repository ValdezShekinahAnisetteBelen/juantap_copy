"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap } from "lucide-react"
import { ProfilePreview } from "@/components/blocks/profile-preview"

export function HeroSection() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (res.ok) {
          const userData = await res.json()
          setUser(userData)
        } else {
          console.error("Failed to fetch user")
        }
      } catch (err) {
        console.error("Error:", err)
      }
    }

    fetchUser()
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Zap className="w-3 h-3 mr-1" />
          Create Your Digital Identity
        </Badge>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Digital Profile,
          <br />
          One Tap Away
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create stunning, personalized digital profiles with social links, custom designs, and instant sharing via QR
          codes or NFC. Perfect for networking, business cards, and social media.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="templates">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
            >
              Create Your Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <Link href={`/profile/${user?.username || "me"}`}>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              View Public Profile
            </Button>
          </Link>
        </div>

        <div className="mt-16">
          <ProfilePreview />
        </div>
      </div>
    </section>
  )
}

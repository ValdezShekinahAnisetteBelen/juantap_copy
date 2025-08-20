"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/blocks/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Eye, Files } from "lucide-react"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

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

  const getProfileImageUrl = (path?: string) => {
  if (!path) return "/placeholder.svg?height=40&width=40"
  if (path.startsWith("http")) return path
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${path}`
}

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

const isActive = (path: string) => {
  if (path === "/") {
    
    return pathname === "/" && hash === "";
  }
  return pathname.startsWith(path);
};

const [hash, setHash] = useState("");

useEffect(() => {
  const updateHash = () => setHash(window.location.hash);
  updateHash(); // run on mount
  window.addEventListener("hashchange", updateHash);
  return () => window.removeEventListener("hashchange", updateHash);
}, []);


  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

     <nav className="hidden md:flex items-center space-x-6">
        {/* Always show Home unless in /dashboard or /dashboard/edit-profile */}
        {!["/dashboard", "/dashboard/edit-profile"].includes(pathname) && (
          <Link
            href="/"
            className={`transition-colors ${
              isActive("/") ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Home
          </Link>
        )}

        {/* Show Features & How It Works only on home */}
        {pathname === "/" && (
          <>
            <Link
              href="/#features"
              className={`transition-colors ${
                hash === "#features"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Features
            </Link>

            <Link
              href="/#how-it-works"
              className={`transition-colors ${
                hash === "#how-it-works"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              How It Works
            </Link>
          </>
        )}

        {(pathname === "/" || pathname.startsWith("/templates")) && (
          <Link
            href="/templates"
            className={`transition-colors ${
              isActive("/templates") ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Templates
          </Link>
        )}
      </nav>

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                 <AvatarImage
                    src={getProfileImageUrl(user?.profile_image)}
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0]?.toUpperCase())
                          .join("")
                      : "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "Loading..."}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/edit-profile">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </Link>
              </DropdownMenuItem>
           <DropdownMenuItem
            onClick={(e) => {
              if (!user?.username) {
                e.preventDefault()
                alert("You cannot access your public profile until you set a username. Please update it in Edit Profile.")
                return
              }
              router.push(`/profile/${user.username}`)
            }}
            className={!user?.username ? "cursor-not-allowed opacity-50" : ""}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Public Profile</span>
          </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Files className="mr-2 h-4 w-4" />
                  <span>My Templates</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="sm"
            onClick={handleLogout}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

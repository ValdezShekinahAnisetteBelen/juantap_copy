"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

const navigationItems = [
  { name: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Payments", href: "/admin/payments", icon: Download },
  { name: "Templates", href: "/admin/templates", icon: FileText, badge: "24" },
  { name: "Users", href: "/admin/users", icon: Users },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Get profile image URL
  const getProfileImageUrl = (path?: string) => {
    if (!path) return "/placeholder.svg?height=40&width=40"
    if (path.startsWith("http")) return path
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${path}`
  }

  // Fetch user if token exists
  const fetchUserData = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setUser(null)
      router.replace("/login")
      return
    }

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
        handleLogout()
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      handleLogout()
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

const handleLogout = () => {
  localStorage.removeItem("token");
  sessionStorage.clear();
  setUser(null);
  router.replace("/login");
};

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JT</span>
            </div>
            <span className="font-semibold text-gray-900">JuanTap Admin</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Admin Profile + Logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={getProfileImageUrl(user?.profile_image)} />
            <AvatarFallback>
              {user?.name
                ? user.name.split(" ").map((n: string) => n[0]?.toUpperCase()).join("")
                : "AD"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name || ""}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="mt-3 flex space-x-2">
            {/* Single handleLogout used for both buttons */}
            <Button variant="ghost" size="sm" className="flex-1" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

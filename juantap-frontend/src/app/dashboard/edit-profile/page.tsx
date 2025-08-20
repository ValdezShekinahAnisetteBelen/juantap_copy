"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Save, User, Globe, MapPin, Phone, Mail, Upload, Plus, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import axios from "axios";

export default function EditProfilePage() {
  const [profile, setProfile] = useState<any>({
  name: "",
 
  email: "",
})

const [socialLinks, setSocialLinks] = useState([
  {
    id: null,                // for update
    platform: "Instagram",
    url: "https://instagram.com/username",
    display_name: "@username",
    is_visible: true,
  },
])

const avatarInputRef = useRef<HTMLInputElement>(null)

const handleSave = async () => {
  const token = localStorage.getItem("token")
  if (!token) return

  const formData = new FormData()
  if (avatarFile) formData.append("avatar", avatarFile)

  formData.append("name", profile.name || "")
  formData.append("firstname", profile.firstname || "")
  formData.append("lastname", profile.lastname || "")
  formData.append("display_name", profile.display_name || "")
  formData.append("username", profile.username || "")
  formData.append("bio", profile.bio || "")
  formData.append("phone", profile.phone || "")
  formData.append("website", profile.website || "")
  formData.append("location", profile.location || "")

  socialLinks.forEach((link, index) => {
    if (link.id !== null && link.id !== undefined) {
      formData.append(`social_links[${index}][id]`, String(link.id))
    }
    formData.append(`social_links[${index}][platform]`, link.platform)
    formData.append(`social_links[${index}][url]`, link.url)
    formData.append(`social_links[${index}][display_name]`, link.display_name || "")
    formData.append(`social_links[${index}][is_visible]`, link.is_visible ? "1" : "0")
  })

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      setProfile((prev: any) => ({ ...prev, ...data }))
      toast.success("Profile saved!")     // <-- success toast here
    } else {
      const err = await res.json()
      toast.error("Error: " + JSON.stringify(err))   // <-- error toast here
    }
  } catch (err) {
    console.error("Failed to save profile", err)
    toast.error("Failed to save profile. Please try again.")   // <-- error toast here
  }
}


useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })

      if (res.ok) {
        const userData = await res.json()

        // Extract profile and social_links
        const { profile, profile_image, email, display_name, username, name, firstname, lastname } = userData
        const socialLinks = userData?.profile?.social_links || []

        setProfile((prev: any) => ({
          ...prev,
          ...profile,
          profile_image,
          display_name,
          email,
          username,
          name,
          firstname,
          lastname,
        }))

        setSocialLinks(socialLinks.map((link: any) => ({
          ...link,
          is_visible: !!link.is_visible, // Ensure boolean
        })))
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  fetchProfile()
}, [])


const [avatarFile, setAvatarFile] = useState<File | null>(null)
const [previewURL, setPreviewURL] = useState<string | null>(null)


// ✅ ADD THIS LINE BEFORE THE RETURN
if (!profile) {
  return <div className="p-8">Loading profile...</div>
}

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                <p className="text-gray-600">Update your profile information and customize your digital presence.</p>
              </div>
            </div>

          </div>

          <div className="space-y-8">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
       <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
             
            <AvatarImage
              src={
              previewURL ||
                (profile.profile_image
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/storage/${profile.profile_image}`
                  : "/avatar.png")
            }

                          />
              <AvatarFallback className="text-lg">
                {profile?.name?.[0] ?? ''}
              </AvatarFallback>
            </Avatar>


            <div className="space-y-2">
              {/* ✅ Hidden file input with ref */}
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setAvatarFile(file)
                  setPreviewURL(URL.createObjectURL(file))
                }
              }}
              className="hidden"
            />
            

            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              onClick={() => avatarInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload New Picture
            </Button>

              <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
            </div>
          </div>
        </CardContent>

            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="Name">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstname || ""}
                    onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                    placeholder="Enter your first name"
                  />

                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name</Label>
                   <Input
                    id="lastname"
                    value={profile.lastname || ""}
                    onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                    placeholder="Enter your last name"
                  />
                  </div>
                </div>

                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                 <Input
                    id="displayName"
                    value={profile.display_name || ""}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                    placeholder="How your name appears on your profile"
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="flex">
                   <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    {(process.env.NEXT_PUBLIC_FRONTEND_URL?.replace(/^https?:\/\//, "") ?? "localhost:3000") + "/"}
                  </span>


                  <Input
                    id="username"
                    value={profile.username || ""}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    placeholder="username"
                  />

                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                 <Textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell people about yourself..."
                  rows={3}
                />

                  <p className="text-sm text-gray-500 mt-1">
                    
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={profile.email}
                      placeholder="your@email.com"
                    />
                  </div>
                   <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                  <Input
                    id="phone"
                    value={profile.phone || ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setProfile({ ...profile, phone: digits });
                    }}
                    placeholder="09156277266"
                    maxLength={11}
                    inputMode="numeric"
                  />

                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Website
                    </Label>
                   <Input
                    id="website"
                    value={profile.website || ""}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                  </div>
                  <div>
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                  <Input
                    id="location"
                    value={profile.location || ""}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, Country"
                  />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Social Media Links
                 <Button
                  size="sm"
                  onClick={() =>
                    setSocialLinks([
                      ...socialLinks,
                      {
                        id: null,
                        platform: "",
                        url: "",
                        display_name: "",
                        is_visible: true,
                      },
                    ])
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>

                </CardTitle>
              </CardHeader>
            <CardContent>
              {socialLinks.map((link, index) => (
              <div key={index} className="mb-4 border p-4 rounded-md space-y-2 relative">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Platform</Label>
                    <Input
                      value={link.platform}
                      onChange={(e) => {
                        const updated = [...socialLinks]
                        updated[index].platform = e.target.value
                        setSocialLinks(updated)
                      }}
                      placeholder="e.g., Instagram"
                    />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...socialLinks]
                        updated[index].url = e.target.value
                        setSocialLinks(updated)
                      }}
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Display Name</Label>
                    <Input
                      value={link.display_name}
                      onChange={(e) => {
                        const updated = [...socialLinks]
                        updated[index].display_name = e.target.value
                        setSocialLinks(updated)
                      }}
                      placeholder="@username"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={link.is_visible}
                  onChange={() => {
                    const updated = [...socialLinks]
                    updated[index].is_visible = !updated[index].is_visible
                    setSocialLinks(updated)
                    toast("Please save changes to update visibility.")
                  }}
                />
                <span className="text-sm">Visible</span>
              </div>
            


                </div>
              </div>
            ))}

            </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

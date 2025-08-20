"use client"

import { useParams, notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { getTemplateById } from "@/lib/template-data"


export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [templateData, setTemplateData] = useState<any | null>(null)
  const [PreviewComponent, setPreviewComponent] = useState<React.ComponentType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/${username}/used-templates`,
          { cache: "no-store" }
        )

        if (!res.ok) {
          setLoading(false)
          return
        }

        const usedTemplates: { slug: string }[] = await res.json()

        if (!usedTemplates?.length) {
          setLoading(false)
          return
        }

        const template = await getTemplateById(usedTemplates[0].slug)
        if (!template) {
          setLoading(false)
          return
        }

        const { previewComponent, ...rest } = template
        setPreviewComponent(() => previewComponent)
        setTemplateData(rest)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (loading) return <div>Loading...</div>
  if (!templateData || !PreviewComponent) return notFound()

  return (
    <>


      {/* Main content with sidebars */}
        <main className="flex-1">
          <div className="">
            <PreviewComponent />
          </div>
       
        </main>

      
      
    </>
  )
}

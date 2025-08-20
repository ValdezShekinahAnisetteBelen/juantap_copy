"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"

export function TopTemplates() {
  const [topTemplates, setTopTemplates] = useState([])

  useEffect(() => {
    async function fetchTopTemplates() {
      const token = localStorage.getItem("token")
      if (!token) {
        setTopTemplates([])
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats/top-templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()
        setTopTemplates(data)
      } catch (err) {
        console.error("Failed to fetch top templates:", err)
        setTopTemplates([])
      }
    }

    fetchTopTemplates()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Templates</CardTitle>
      </CardHeader>
      <CardContent>
        {topTemplates.length === 0 ? (
          <p className="text-sm text-gray-500">No data available</p>
        ) : (
          <div className="space-y-4">
            {topTemplates.map((template, index) => (
              <div key={template.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{template.name}</h3>
                    <Badge variant={template.category === "Premium" ? "default" : "secondary"}>
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{template.views.toLocaleString()}</span>
                    </div>
                    {template.revenue > 0 && (
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-bold">₱</span>
                        <span>{Number(template.revenue).toLocaleString("en-PH", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`text-xs px-2 py-1 rounded ${
                    template.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {template.trend === "up" ? "↗" : "↘"}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// app/layout.tsx
import { AdminSidebar } from "@/components/admin/admin-sidebar"
export const metadata = {
  title: "Your App",
  description: "Your app description",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body className="min-h-screen bg-gray-50 flex">
  <AdminSidebar />
  <main className="flex-1 ml-64">{children}</main>
</body>
    </html>
  )
}

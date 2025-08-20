import Link from "next/link"
import { Logo } from "@/components/blocks/logo"

interface FooterSection {
  title: string
  links: Array<{
    href: string
    label: string
  }>
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { href: "#", label: "Features" },
      { href: "#", label: "Templates" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Examples" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "FAQ" },
      { href: "#", label: "Tutorials" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Blog" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
            <p className="text-gray-400">
              Create and share your digital profile with the world. One tap, endless possibilities.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, item) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 JuanTap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

"use client";

import { Header } from "@/components/layout/header";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAllTemplates } from "@/lib/template-data";
import { TemplateCard } from "@/components/templates/template-card";
import { TemplateFilters } from "@/components/templates/template-filters";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const pathname = usePathname();
  const [freeTemplates, setFreeTemplates] = useState<any[]>([]);
  const [premiumTemplates, setPremiumTemplates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // <-- Add search state
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const allTemplates = await getAllTemplates();

        const res = await fetch(`${API_URL}/templates/saved`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch saved templates");

        const savedData: Array<{ slug: string }> = await res.json();
        const savedSlugs = savedData.map((t) => t.slug);

        const filteredTemplates = allTemplates.filter((template) =>
          savedSlugs.includes(template.id)
        );

        setFreeTemplates(filteredTemplates.filter((t) => t.category === "free"));
        setPremiumTemplates(filteredTemplates.filter((t) => t.category === "premium"));

        const currentSlug = pathname.split("/").pop() || "";
        const found = savedSlugs.includes(currentSlug);
        setIsSaved(found);
      } catch (err) {
        console.error("Error loading templates:", err);
      }
    };

    loadTemplates();
  }, [pathname]);

  // Filter templates by searchQuery (case insensitive)
  const filteredFreeTemplates = freeTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPremiumTemplates = premiumTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
     <Header />
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        {/* Pass search state to TemplateFilters */}
        <TemplateFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Free Templates */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Free Templates</h2>
            <span className="text-sm text-gray-500">{filteredFreeTemplates.length} templates</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFreeTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Premium Templates */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Premium Templates</h2>
            <span className="text-sm text-gray-500">{filteredPremiumTemplates.length} templates</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPremiumTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

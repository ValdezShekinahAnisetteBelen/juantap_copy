"use client";

import { useState, useEffect } from "react";
import { getAllTemplates } from "@/lib/template-data";
import { TemplateCard } from "@/components/templates/template-card";
import { TemplateFilters } from "@/components/templates/template-filters";

export function TemplateGallery() {
  const [templates, setTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load templates once on mount
    getAllTemplates().then(setTemplates);
  }, []);

  const freeTemplates = templates.filter((t) => t.category === "free" && t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const premiumTemplates = templates.filter((t) => t.category === "premium" && t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        {/* Pass search state and setter to TemplateFilters */}
        <TemplateFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Free Templates */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Free Templates</h2>
            <span className="text-sm text-gray-500">{freeTemplates.length} templates</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Premium Templates */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Premium Templates</h2>
            <span className="text-sm text-gray-500">{premiumTemplates.length} templates</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

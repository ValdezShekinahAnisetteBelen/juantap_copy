"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Template } from "@/lib/template-data";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const PreviewComponent = template.previewComponent;

  return (
    <Card className="overflow-hidden shadow-lg border-0">
      <CardContent className="p-0">
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          {PreviewComponent ? (
            <PreviewComponent />
          ) : (
            <img
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

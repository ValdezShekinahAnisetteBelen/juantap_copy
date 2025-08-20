"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface TemplateFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function TemplateFilters({ searchQuery, setSearchQuery }: TemplateFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Templates", count: 10 },
    { id: "free", label: "Free", count: 3 },
    { id: "premium", label: "Premium", count: 7 },
  ];

  const layouts = ["All Layouts", "Minimal", "Modern", "Creative", "Professional", "Artistic"];
  const sortOptions = ["Popular", "Newest", "Price: Low to High", "Price: High to Low", "Most Downloaded"];

  return (
    <div className="mb-12">
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {/* Sort and Layout selects (you can lift their states too if needed) */}
          <Select defaultValue="popular">
            <SelectTrigger className="w-48">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option.toLowerCase().replace(/[^a-z0-9]/g, "")}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {layouts.map((layout) => (
                <SelectItem key={layout} value={layout.toLowerCase().replace(/[^a-z0-9]/g, "")}>
                  {layout}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className={`${
              activeCategory === category.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600"
                : "bg-transparent hover:bg-gray-50"
            }`}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}

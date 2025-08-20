"use client"; // 👈 important, needed for hooks like useRouter

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt: string;
  preview?: string;
  thumbnail?: string;
}

export default function AdminTemplatesPage() {
   const router = useRouter();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    preview: "",
    thumbnail: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  
  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch templates");

      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch templates");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const slug = newTemplate.name.toLowerCase().replace(/\s+/g, "-");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug,
          name: newTemplate.name,
          description: newTemplate.description,
          category: newTemplate.category,
          price: newTemplate.price,
          preview_url: newTemplate.preview,
          thumbnail_url: newTemplate.thumbnail,
        }),
      });

      if (!res.ok) throw new Error("Failed to add template");

      toast.success("Template added successfully!");
      setIsAdding(false);
      setNewTemplate({ name: "", description: "", category: "", price: 0, preview: "", thumbnail: "" });
      fetchTemplates();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete template");
      toast.success("Template deleted successfully!");
      fetchTemplates();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const routeToAdd = () => {
    router.push("admin/templates/add"); // <-- specify the path
  };
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Templates Management
      </h1>

      <Card className="shadow-xl border-0">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Button
              className="flex items-center gap-2 bg-blue-600 text-white"
              onClick={routeToAdd}
            >
              <Plus className="w-4 h-4" /> Add Template
            </Button>
          </div>

          {isAdding && (
            <div className="p-4 border rounded-md space-y-3 bg-gray-50 mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full border p-2 rounded"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded"
                value={newTemplate.price}
                onChange={(e) => setNewTemplate({ ...newTemplate, price: parseFloat(e.target.value) })}
              />
              <input
                type="text"
                placeholder="Preview URL"
                className="w-full border p-2 rounded"
                value={newTemplate.preview}
                onChange={(e) => setNewTemplate({ ...newTemplate, preview: e.target.value })}
              />
              <input
                type="text"
                placeholder="Thumbnail URL"
                className="w-full border p-2 rounded"
                value={newTemplate.thumbnail}
                onChange={(e) => setNewTemplate({ ...newTemplate, thumbnail: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="bg-green-600 text-white">Save</Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <table className="min-w-full text-left text-sm border">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-2 font-semibold">Name</th>
                  <th className="px-4 py-2 font-semibold">Description</th>
                  <th className="px-4 py-2 font-semibold">Category</th>
                  <th className="px-4 py-2 font-semibold">Price</th>
                  <th className="px-4 py-2 font-semibold">Created At</th>
                  <th className="px-4 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{template.name}</td>
                    <td className="px-4 py-2">{template.description}</td>
                    <td className="px-4 py-2 capitalize">{template.category}</td>
                    <td className="px-4 py-2">₱{template.price}</td>
                    <td className="px-4 py-2">{template.createdAt}</td>
                    <td className="px-4 py-2 flex gap-2">
                    
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {templates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                      No templates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

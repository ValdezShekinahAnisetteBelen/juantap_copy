"use client";

import type { Template } from "@/lib/template-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/templates/payment-modal";
import {
  Download,
  Heart,
  Share2,
  Crown,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Import Sonner toast
import { toast, Toaster } from "sonner";

interface TemplatePreviewSidebarProps {
  template: Template;
}

export function TemplatePreviewSidebar({ template }: TemplatePreviewSidebarProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [savedStatus, setSavedStatus] = useState<
    "saved" | "bought" | "pending" | "free" | "locked"
  >(template.category === "premium" ? "pending" : "free");
  const [usedStatus, setUsedStatus] = useState<"used" | "unused">("unused");

  const isPremium = template.category === "premium";
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname();

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    const fetchTemplateStatuses = async () => {
      try {
        const res = await fetch(`${API_URL}/templates/saved`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error("Failed to fetch templates status");
        const data: { slug: string; status: string }[] = await res.json();
        const currentSlug = pathname.split("/").pop();
        if (!currentSlug) return;

        const found = data.find((t) => t.slug === currentSlug);

        if (found) {
          setSavedStatus(found.status as typeof savedStatus);
        } else {
          setSavedStatus(isPremium ? "locked" : "free");
        }
      } catch (err) {
        console.error(err);
        setSavedStatus(isPremium ? "pending" : "free");
      }
    };

    fetchTemplateStatuses();
  }, [pathname, template.id, isPremium, API_URL]);

  useEffect(() => {
    const fetchUsedTemplates = async () => {
      try {
        const res = await fetch(`${API_URL}/templates/used`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error("Failed to fetch used templates");
        const usedTemplates: { slug: string }[] = await res.json();
        const currentSlug = pathname.split("/").pop();
        if (!currentSlug) return;

        if (usedTemplates.some((t) => t.slug === currentSlug)) {
          setUsedStatus("used");
        } else {
          setUsedStatus("unused");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsedTemplates();
  }, [pathname, API_URL]);

  const isSaved = savedStatus === "saved";
  const isBought = savedStatus === "bought";
  const isPending = savedStatus === "pending";
  const isUsed = usedStatus === "used";

  const handleGetTemplate = async () => {
    if (isPremium) {
      if (isBought) {
        toast.message("You already own this template.");
      } else if (isPending) {
        toast.message("Your purchase is still pending approval.");
      } else {
        setShowPaymentModal(true);
      }
    } else {
      if (isSaved) {
        await unsaveTemplate();
      } else {
        await saveTemplate();
      }
    }
  };

  const saveTemplate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.id}`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to save template");
      toast.success("Template saved to your account!");
      setSavedStatus("saved");
    } catch (err) {
      console.error(err);
      toast.error("Error saving template");
    } finally {
      setIsSaving(false);
    }
  };

  const unsaveTemplate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/templates/saved/${template.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to unsave template");
      toast.success("Template removed from your saved list.");
      setSavedStatus("free");
    } catch (err) {
      console.error(err);
      toast.error("Error removing template");
    } finally {
      setIsSaving(false);
    }
  };

  const markUsed = async () => {
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.id}`, {
        method: "POST",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to mark as used");
      toast.success("Template marked as used!");
      setUsedStatus("used");
    } catch (err) {
      console.error(err);
      toast.error("Error marking template as used");
    }
  };

  const markUnused = async () => {
    try {
      const res = await fetch(`${API_URL}/templates/used/${template.id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error("Failed to mark as unused");
      toast.success("Template marked as unused.");
      setUsedStatus("unused");
    } catch (err) {
      console.error(err);
      toast.error("Error marking template as unused");
    }
  };

  const toggleUsed = () => {
    if (isUsed) {
      markUnused();
    } else {
      markUsed();
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/templates/${template.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${template.name} Template - JuanTap`,
          text: template.description,
          url,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Template link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Sonner Toaster */}
      <Toaster position="top-center" richColors />

      <div className="space-y-6">
        {/* Purchase Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isPremium && <Crown className="w-5 h-5 text-yellow-600" />}
              {isPremium ? "Premium Template" : "Free Template"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              {isPremium ? (
                <div className="space-y-2">
                  {template.originalPrice && template.discount ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ₱{template.price}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        ₱{template.originalPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      ₱{template.price}
                    </span>
                  )}
                  <p className="text-sm text-gray-600">One-time payment</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-3xl font-bold text-green-600">Free</span>
                  <p className="text-sm text-gray-600">
                    {isSaved
                      ? "Already saved to your account"
                      : "No payment required"}
                  </p>
                </div>
              )}
            </div>

            {/* Save / Purchase Button */}
            <Button
              onClick={handleGetTemplate}
              disabled={
                isSaving ||
                (isPremium && (isBought || isPending)) ||
                (!isPremium && isSaved)
              }
              className={`w-full ${
                isPremium
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  : isSaved
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              {isPremium
                ? isBought
                  ? "Owned"
                  : isPending
                  ? "Pending Approval"
                  : "Purchase Template"
                : isSaving
                ? isSaved
                  ? "Removing..."
                  : "Saving..."
                : isSaved
                ? "Unsave"
                : "Save Free"}
            </Button>

            {/* Used/Unused toggle button */}
            {(isBought || isSaved) && (
              <Button
                onClick={toggleUsed}
                className={`w-full mt-2 ${
                  isUsed ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
                size="lg"
              >
                {isUsed ? "Mark as Unused" : "Mark as Used"}
              </Button>
            )}

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex-1 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Template Info */}
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Category</span>
              <Badge variant={isPremium ? "default" : "secondary"}>
                {isPremium ? "Premium" : "Free"}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Layout Style</span>
              <span className="font-medium capitalize">{template.layout}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Downloads</span>
              <span className="font-medium">{template.downloads.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        {isPremium && (
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Premium template design",
                  "Full customization options",
                  "Mobile responsive design",
                  "Priority customer support",
                  "Lifetime updates",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        template={template}
        onPaymentSuccess={() => {
          setShowPaymentModal(false);
          setSavedStatus("bought");
          toast.success("Payment successful! Template unlocked.");
        }}
      />
    </>
  );
}

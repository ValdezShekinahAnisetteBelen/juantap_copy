"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, Search, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPaymentId, setLoadingPaymentId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/payments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      toast.error("Failed to fetch payments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: number, action: "approve" | "disapprove") => {
    try {
      setLoadingPaymentId(id);
      const res = await fetch(
        `http://localhost:8000/api/admin/payments/${id}/${action}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!res.ok) throw new Error("Failed to update payment status");

      toast.success(
        action === "approve"
          ? "Payment approved successfully!"
          : "Payment disapproved successfully!"
      );

      fetchPayments();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingPaymentId(null);
    }
  };

  const truncateText = (text: string, length = 50) => {
    if (!text) return "-";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      disapproved: "bg-red-100 text-red-800 hover:bg-red-100",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    };
    return (
      <Badge className={styles[status] || styles.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    if (price == null) return "-";
    return price.toLocaleString("en-PH");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const flattenObject = (obj: any): string => {
    let result = "";
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        result += " " + flattenObject(obj[key]);
      } else {
        result += " " + String(obj[key] ?? "");
      }
    }
    return result;
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter + sort
  const sortedPayments = [...payments]
    .filter((p) =>
      flattenObject(p).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination slice
  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
  const paginatedPayments = sortedPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Payment Management
      </h1>

      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search payments..."
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
        />
      </div>

      <Card className="shadow-xl border-0">
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {[
                      { label: "User", key: "user.name" },
                      { label: "Template", key: "template.name" },
                      { label: "Method", key: "payment_method" },
                      { label: "Reference", key: "reference_number" },
                      { label: "Notes", key: "notes" },
                      { label: "Receipt", key: "" },
                      { label: "Status", key: "status" },
                      { label: "Submitted At", key: "submitted_at" },
                      { label: "Actions", key: "" },
                      { label: "", key: "" },
                    ].map((header) => (
                      <th
                        key={header.label}
                        onClick={() => header.key && handleSort(header.key)}
                        className={`px-5 py-3 font-semibold text-gray-600 cursor-pointer ${
                          header.key ? "hover:underline" : ""
                        }`}
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayments.map((payment) => (
                    <>
                      <tr
                        key={payment.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-5 py-3">{payment.user?.name}</td>
                        <td className="px-5 py-3">{payment.template?.name}</td>
                        <td className="px-5 py-3 capitalize">
                          {payment.payment_method}
                        </td>
                        <td className="px-5 py-3">
                          {payment.reference_number || "-"}
                        </td>
                        <td className="px-5 py-3">
                          {truncateText(payment.notes, 50)}{" "}
                          {payment.notes?.length > 50 && (
                            <button
                              onClick={() => setSelectedNotes(payment.notes)}
                              className="text-blue-600 underline hover:text-blue-800 text-xs"
                            >
                              Read More
                            </button>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          {payment.receipt_img && (
                            <button
                              onClick={() =>
                                setSelectedImage(
                                  `http://localhost:8000/storage/${payment.receipt_img}`
                                )
                              }
                              className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition"
                              title="View Receipt"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="px-5 py-3">
                          {formatDate(payment.submitted_at)}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            {payment.status !== "approved" && (
                              <Button
                                onClick={() =>
                                  handleAction(payment.id, "approve")
                                }
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                                disabled={loadingPaymentId === payment.id}
                              >
                                {loadingPaymentId === payment.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  "Approve"
                                )}
                              </Button>
                            )}
                            {payment.status !== "disapproved" && (
                              <Button
                                onClick={() =>
                                  handleAction(payment.id, "disapprove")
                                }
                                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
                                disabled={loadingPaymentId === payment.id}
                              >
                                {loadingPaymentId === payment.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  "Disapprove"
                                )}
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => toggleRow(payment.id)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            {expandedRows.includes(payment.id) ? (
                              <Minus className="w-4 h-4 text-gray-600" />
                            ) : (
                              <Plus className="w-4 h-4 text-gray-600" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {expandedRows.includes(payment.id) && (
                        <tr className="bg-gray-50">
                          <td colSpan={10} className="px-5 py-3 text-sm text-gray-700">
                            <div className="flex flex-wrap gap-8">
                              <div>
                                <strong>Template Price:</strong> ₱
                                {formatPrice(payment.template?.price)}
                              </div>
                              <div>
                                <strong>User Email:</strong>{" "}
                                {payment.user?.email || "-"}
                              </div>
                              <div>
                                <strong>User Contact Number:</strong>{" "}
                                {payment.user?.profile?.phone || "-"}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Notes Modal */}
      {selectedNotes && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedNotes(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg max-h-[80vh] overflow-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Full Notes</h2>
            <p className="whitespace-pre-wrap">{selectedNotes}</p>
            <Button
              onClick={() => setSelectedNotes(null)}
              className="mt-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Receipt"
              className="w-full h-auto rounded-lg"
            />
            <Button
              onClick={() => setSelectedImage(null)}
              className="mt-4 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

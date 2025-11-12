"use client";

import React, { useMemo, useState } from "react";
import { MdOutlineBusiness, MdPerson, MdCall, MdDelete } from "react-icons/md";
import BaseModal from "@/components/shared/BaseModal";
import DeleteConfirm from "./DeleteConfirm";
import api from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Companies = ({ allCompanies = [] }) => {
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const filteredCompanies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCompanies;
    return allCompanies.filter(
      (c) =>
        c.companyName?.toLowerCase().includes(q) ||
        c.representativeName?.toLowerCase().includes(q) ||
        c.representativePhone?.toLowerCase().includes(q)
    );
  }, [query, allCompanies]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete("/api/company", { data: { id: selectedCompany.id } });
      toast.success(`"${selectedCompany.companyName}" deleted successfully`);
      setShowModal(false);
      router.refresh();
    } catch (error) {
      console.error("❌ Delete error:", error);
      toast.error("Failed to delete company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdOutlineBusiness className="text-indigo-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Company Directory
        </h2>
      </div>

      {/* Search */}
      <div className="mb-8 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by company name, representative name, or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-2/3 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-sm text-gray-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-600 to-purple-500 rounded-t-xl"></div>

              {/* Delete Button */}
              <button
                onClick={() => {
                  setSelectedCompany(company);
                  setShowModal(true);
                }}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
              >
                <MdDelete className="w-5 h-5" />
              </button>

              {/* Company Details */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {company.companyName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {company.address || "No address provided"}
                </p>
              </div>

              {/* Representative Info */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <MdPerson className="text-purple-600" />
                  <p className="text-sm font-medium">
                    {company.representativeName || "No representative"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MdCall className="text-green-600" />
                  <p className="text-sm">
                    {company.representativePhone || "No phone available"}
                  </p>
                </div>
              </div>

              {/* Bottom gradient bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-600 rounded-b-xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10 text-center">
          No companies found matching your search.
        </p>
      )}

      {/* 🔥 Dynamic Modal with Custom Content */}
      <BaseModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <DeleteConfirm
          name={selectedCompany?.companyName}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      </BaseModal>
    </div>
  );
};

export default Companies;

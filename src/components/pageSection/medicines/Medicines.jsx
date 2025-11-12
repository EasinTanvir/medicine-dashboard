"use client";

import React, { useMemo, useState } from "react";
import {
  MdOutlineLocalPharmacy,
  MdEdit,
  MdDelete,
  MdDone,
} from "react-icons/md";
import BaseModal from "@/components/shared/BaseModal";
import ConfirmAction from "@/components/shared/ConfirmAction";
import MedicineEditForm from "./MedicineEditForm";
import api from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/shared/EmptyState";
import Link from "next/link";

const Medicines = ({ allMedicines, companies }) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🧩 Filter by company and status
  const filteredMedicines = useMemo(() => {
    let filtered = allMedicines;
    if (selectedCompany) {
      filtered = filtered.filter((m) => m.company?.id === selectedCompany);
    }
    if (selectedStatus) {
      filtered = filtered.filter((m) => m.status === selectedStatus);
    }
    return filtered;
  }, [selectedCompany, selectedStatus, allMedicines]);

  // 🧮 Grand total
  const grandTotal = filteredMedicines.reduce(
    (acc, m) => acc + (m.price * m.quantity || 0),
    0
  );

  // 🗑️ Delete handler
  const handleDelete = async () => {
    if (!selectedMedicine) return;
    try {
      setLoading(true);
      await api.delete("/api/medicine", { data: { id: selectedMedicine.id } });
      toast.success("Medicine deleted successfully");
      setDeleteModal(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete medicine");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark as Done
  const handleMarkDone = async (medicine) => {
    try {
      setLoading(true);
      await api.put("/api/medicine/status", {
        id: medicine.id,
        status: "done",
      });
      toast.success(`"${medicine.name}" marked as done ✅`);
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Status-based styling
  const getStatusClasses = (status) => {
    switch (status) {
      case "done":
        return "border-green-300 bg-green-50";
      case "pending":
      default:
        return "border-red-300 bg-red-50/70"; // ✅ subtle red tint for pending
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdOutlineLocalPharmacy className="text-green-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Medicine List</h2>
      </div>

      {/* Filters */}
      <div className="mb-6 grid sm:grid-cols-2 gap-4">
        {/* Company Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Company
          </label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
          >
            <option value="">All Companies</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Medicine Cards */}
      {filteredMedicines.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMedicines.map((m) => (
              <div
                key={m.id}
                className={`relative border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 ${getStatusClasses(
                  m.status
                )}`}
              >
                {/* Medicine Info */}
                <div className="mt-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {m.name}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        m.status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Company:{" "}
                    <span className="font-medium text-gray-800">
                      {m.company?.companyName || "N/A"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity:{" "}
                    <span className="font-medium text-gray-800">
                      {m.quantity}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Price per unit:{" "}
                    <span className="font-medium text-gray-800">
                      ৳ {m.price}
                    </span>
                  </p>
                </div>

                {/* Subtotal */}
                <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-2">
                  <p className="text-sm text-gray-500">Subtotal:</p>
                  <p className="text-lg font-semibold text-green-600">
                    ৳ {(m.price * m.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-between items-center">
                  {m.status !== "done" ? (
                    <button
                      onClick={() => handleMarkDone(m)}
                      disabled={loading}
                      className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
                    >
                      <MdDone /> Done
                    </button>
                  ) : (
                    <div className="text-sm text-gray-400 italic">
                      Completed
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMedicine(m);
                        setUpdateModal(true);
                      }}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <MdEdit /> Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMedicine(m);
                        setDeleteModal(true);
                      }}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="mt-10 p-5 border-t border-gray-100 flex justify-between items-center bg-green-50 rounded-xl">
            <p className="text-lg font-semibold text-gray-800">Grand Total:</p>
            <p className="text-2xl font-bold text-green-700">
              ৳ {grandTotal.toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <div className="pt-16 space-y-10">
          <EmptyState title="No Medicine Found" color="red" />
          <div className="flex justify-center">
            <Link
              className="bg-black text-white rounded-2xl py-2 px-10"
              href="/add-medicine"
            >
              Add Medicine
            </Link>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <BaseModal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <ConfirmAction
          title="Delete Medicine"
          message={`Are you sure you want to delete "${selectedMedicine?.name}"? This action cannot be undone.`}
          confirmText="Yes, Delete"
          confirmColor="red"
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      </BaseModal>

      {/* Update Modal */}
      <BaseModal isOpen={updateModal} onClose={() => setUpdateModal(false)}>
        {selectedMedicine && (
          <MedicineEditForm
            medicine={selectedMedicine}
            onClose={() => setUpdateModal(false)}
            companies={companies}
          />
        )}
      </BaseModal>
    </div>
  );
};

export default Medicines;

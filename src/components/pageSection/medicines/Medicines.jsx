"use client";

import React, { useState, useMemo } from "react";
import { MdOutlineLocalPharmacy, MdEdit, MdDelete } from "react-icons/md";
import BaseModal from "@/components/shared/BaseModal";
import ConfirmAction from "@/components/shared/ConfirmAction";
import api from "@/libs/api";
import toast from "react-hot-toast";
import MedicineEditForm from "./MedicineEditForm";
import { useRouter } from "next/navigation";

const Medicines = ({ allMedicines, companies }) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Filter by company if selected
  const filteredMedicines = useMemo(() => {
    if (!selectedCompany) return allMedicines;
    return allMedicines.filter((m) => m.company?.id === selectedCompany);
  }, [selectedCompany, allMedicines]);

  const grandTotal = filteredMedicines.reduce(
    (acc, m) => acc + (m.price * m.quantity || 0),
    0
  );

  // 🗑️ Handle delete
  const handleDelete = async () => {
    if (!selectedMedicine) return;
    try {
      setLoading(true);
      await api.delete("/api/medicine", { data: { id: selectedMedicine.id } });
      toast.success("Medicine deleted successfully");
      setDeleteModal(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdOutlineLocalPharmacy className="text-green-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Medicine List</h2>
      </div>

      {/* Company Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Company
        </label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full sm:w-1/2 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
        >
          <option value="">All Companies</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Medicine Cards */}
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMedicines.map((m) => (
            <div
              key={m.id}
              className="relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 to-emerald-600 rounded-t-xl"></div>

              <div className="mt-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {m.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Company:{" "}
                  <span className="font-medium text-gray-800">
                    {m.company?.companyName || "N/A"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity:{" "}
                  <span className="font-medium text-gray-800">
                    {m.quantity}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Price per unit:{" "}
                  <span className="font-medium text-gray-800">৳ {m.price}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">Subtotal:</p>
                <p className="text-lg font-semibold text-green-600">
                  ৳ {(m.price * m.quantity).toFixed(2)}
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => {
                    setSelectedMedicine(m);
                    setUpdateModal(true);
                  }}
                  className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <MdEdit /> Update
                </button>
                <button
                  onClick={() => {
                    setSelectedMedicine(m);
                    setDeleteModal(true);
                  }}
                  className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <MdDelete /> Delete
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-emerald-600 to-green-500 rounded-b-xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4 text-center">No medicines found.</p>
      )}

      {/* Grand Total */}
      <div className="mt-10 p-5 border-t border-gray-100 flex justify-between items-center bg-green-50 rounded-xl">
        <p className="text-lg font-semibold text-gray-800">Grand Total:</p>
        <p className="text-2xl font-bold text-green-700">
          ৳ {grandTotal.toFixed(2)}
        </p>
      </div>

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

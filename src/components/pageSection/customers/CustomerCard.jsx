"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCall, MdLocationOn, MdDelete, MdEdit } from "react-icons/md";
import { FaCheckCircle, FaPills } from "react-icons/fa";
import BaseModal from "@/components/shared/BaseModal";
import ConfirmAction from "@/components/shared/ConfirmAction";
import api from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CustomerForm from "./CustomerForm";

const CustomerCard = ({ customer, allCompanies }) => {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const router = useRouter();

  // ✅ Handle status update
  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
      await api.put("/api/customer/status", {
        id: customer.id,
        status: "done",
      });
      toast.success(`${customer.customerName} marked as done ✅`);
      setStatusModal(false);
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Handle delete
  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete("/api/customer", { data: { id: customer.id } });
      toast.success(`Deleted ${customer.customerName}`);
      setDeleteModal(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Conditional styles
  const getCardClasses = (status) => {
    if (status === "done") return "border-green-400 bg-green-50";
    return "border-red-300 bg-red-50/70"; // ✅ subtle reddish tint for pending
  };

  return (
    <motion.div
      layout
      className={`relative border rounded-xl shadow-sm p-5 hover:shadow-md transition ${getCardClasses(
        customer.status
      )}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {customer.customerName}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            customer.status === "done"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.status.toUpperCase()}
        </span>
      </div>

      {/* Info */}
      <p className="text-sm text-gray-700 mb-2 flex items-center gap-1">
        <MdCall className="text-blue-600" />
        {customer.customerPhone || "No phone provided"}
      </p>
      <p className="text-sm text-gray-700 flex items-center gap-1">
        <MdLocationOn className="text-red-600" />
        {customer.customerAddress || "No address provided"}
      </p>

      {/* Medicines */}
      <div className="mt-4 border-t pt-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <FaPills className="text-green-500" /> Medicines
        </h4>
        {customer.medicines.length > 0 ? (
          <ul className="space-y-2">
            {customer.medicines.map((m) => (
              <li
                key={m.id}
                className="flex justify-between items-center bg-white/70 p-2 rounded-md text-sm border border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-800">{m.medicineName}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {m.quantity} | {m.company?.companyName || "No company"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500 italic mt-2">
            No medicines added.
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setEditModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          <MdEdit /> Edit
        </button>

        <button
          onClick={() => setStatusModal(true)}
          disabled={customer.status === "done"}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
            customer.status === "done"
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          <FaCheckCircle />
          {customer.status === "done" ? "Completed" : "Mark Done"}
        </button>

        <button
          onClick={() => setDeleteModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-red-100 text-red-600 hover:bg-red-200"
        >
          <MdDelete /> Delete
        </button>
      </div>

      {/* Modals */}
      <BaseModal isOpen={statusModal} onClose={() => setStatusModal(false)}>
        <ConfirmAction
          title="Mark Customer as Done"
          message={`Do you want to mark "${customer.customerName}" as done?`}
          confirmText="Yes, Mark Done"
          confirmColor="green"
          onClose={() => setStatusModal(false)}
          onConfirm={handleStatusUpdate}
          loading={loading}
        />
      </BaseModal>

      <BaseModal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <ConfirmAction
          title="Delete Customer"
          message={`Are you sure you want to delete "${customer.customerName}"?`}
          confirmText="Yes, Delete"
          confirmColor="red"
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      </BaseModal>

      <BaseModal
        maxWidth="w-[650px]"
        isOpen={editModal}
        onClose={() => setEditModal(false)}
      >
        <CustomerForm
          allCompanies={allCompanies}
          existingCustomer={customer}
          onClose={() => setEditModal(false)}
        />
      </BaseModal>
    </motion.div>
  );
};

export default CustomerCard;

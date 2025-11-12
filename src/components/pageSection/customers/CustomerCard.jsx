"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCall, MdLocationOn, MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import BaseModal from "@/components/shared/BaseModal";
import api from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmAction from "@/components/shared/ConfirmAction";

const CustomerCard = ({ customer }) => {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
      await api.put("/api/customer", { id: customer.id, status: "done" });
      toast.success(`${customer.customerName} marked as done ✅`);
      setStatusModal(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete("/api/customer", { data: { id: customer.id } });
      toast.success(`Deleted ${customer.customerName}`);
      setDeleteModal(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      layout
      className={`relative bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition ${
        customer.status === "done" ? "border-green-400" : "border-yellow-300"
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {customer.customerName}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            customer.status === "done"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {customer.status.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        <MdCall className="inline mr-1 text-blue-600" />
        {customer.customerPhone || "No phone provided"}
      </p>
      <p className="text-sm text-gray-600">
        <MdLocationOn className="inline mr-1 text-red-600" />
        {customer.customerAddress || "No address provided"}
      </p>

      <div className="mt-4 flex justify-between items-center">
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

      {/* ✅ Status Modal */}
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
          title="Delete Confirmation"
          message={`Are you sure you want to delete "${customer.customerName}"? This action cannot be undone.`}
          confirmText="Yes, Delete"
          confirmColor="red"
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
        />
      </BaseModal>
    </motion.div>
  );
};

export default CustomerCard;

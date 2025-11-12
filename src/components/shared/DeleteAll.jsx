"use client";

import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/libs/api";
import BaseModal from "./BaseModal";
import ConfirmAction from "./ConfirmAction";

const DeleteAll = ({ endpoint, title = "Reset All Data", tag }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      const res = await api.post(endpoint, { tag });
      toast.success(res.data?.message || "All records deleted successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset records");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-red-100 text-red-700 font-medium px-4 py-2 rounded-md hover:bg-red-200 transition"
      >
        <MdDeleteForever className="text-lg" />
        {title}
      </button>

      {/* Confirmation Modal */}
      <BaseModal isOpen={open} onClose={() => setOpen(false)}>
        <ConfirmAction
          title="Confirm Reset"
          message="Are you sure you want to delete all records? This action cannot be undone."
          confirmText="Yes, Delete All"
          confirmColor="red"
          onConfirm={handleDeleteAll}
          onClose={() => setOpen(false)}
          loading={loading}
        />
      </BaseModal>
    </>
  );
};

export default DeleteAll;

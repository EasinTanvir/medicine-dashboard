import React, { useState } from "react";
import api from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MedicineEditForm = ({ medicine, companies, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: medicine.name,
    quantity: medicine.quantity,
    price: medicine.price,
    companyId: medicine.company?.id || "",
  });
  const router = useRouter();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put("/api/medicine", {
        id: medicine.id,
        ...form,
      });
      toast.success("Medicine updated successfully");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-5 p-2 text-left">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Update Medicine
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Medicine Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Price (৳)
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Company
        </label>
        <select
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
        >
          <option value="">Select company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.companyName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default MedicineEditForm;

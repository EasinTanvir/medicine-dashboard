"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import toast from "react-hot-toast";
import api from "@/libs/api";
import { useRouter } from "next/navigation";

const AddMedicineForm = ({ companies = [] }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyId: "",
      medicines: [{ name: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });
  const medicines = useWatch({ control, name: "medicines" });

  const calculateSubtotal = (m) =>
    (Number(m.quantity) || 0) * (Number(m.price) || 0);

  const grandTotal = medicines?.reduce(
    (acc, m) => acc + calculateSubtotal(m),
    0
  );

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        companyId: data.companyId,
        medicines: data.medicines.map((m) => ({
          name: m.name,
          quantity: Number(m.quantity) || 1,
          price: Number(m.price) || 0,
        })),
      };

      const res = await api.post("/api/medicine", payload);
      toast.success("Medicines added successfully!");

      reset();
      router.refresh();
    } catch (error) {
      console.error("❌ Error adding medicine:", error);
      toast.error("Failed to add medicines");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MdOutlineLocalPharmacy className="text-green-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Add Medicines</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Company Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Company <span className="text-red-500">*</span>
          </label>
          <select
            {...register("companyId", { required: "Company is required" })}
            defaultValue=""
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
              errors.companyId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Choose a company
            </option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.companyName}
              </option>
            ))}
          </select>
          {errors.companyId && (
            <p className="text-sm text-red-500 mt-1">
              {errors.companyId.message}
            </p>
          )}
        </div>

        {/* Medicine Fields */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-green-500 pl-2">
            Medicine Information
          </h3>

          {fields.map((field, index) => {
            const subtotal = calculateSubtotal(medicines[index] || {});
            return (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-4 border border-gray-100 p-4 rounded-xl bg-gray-50"
              >
                {/* Medicine Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Medicine Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter medicine name"
                    {...register(`medicines.${index}.name`, {
                      required: "Medicine name is required",
                    })}
                    className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.medicines?.[index]?.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.medicines?.[index]?.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.medicines[index].name.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    {...register(`medicines.${index}.quantity`)}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                    defaultValue={1}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    {...register(`medicines.${index}.price`)}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                    defaultValue={0}
                  />
                </div>

                {/* Subtotal */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Subtotal (৳)
                  </label>
                  <input
                    readOnly
                    value={subtotal.toFixed(2)}
                    className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-700 border-gray-300"
                  />
                </div>

                {/* Remove Button */}
                {fields.length > 1 && (
                  <div className="sm:col-span-4 flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => append({ name: "", quantity: 1, price: 0 })}
            className="mt-2 text-sm font-semibold text-green-600 hover:text-green-700"
          >
            + Add More Medicine
          </button>
        </div>

        {/* Grand Total */}
        <div className="border-t pt-4 mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">Grand Total:</p>
          <p className="text-2xl font-bold text-green-600">
            ৳ {grandTotal.toFixed(2)}
          </p>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-green-600 to-emerald-500 text-white font-semibold py-3 rounded-md hover:opacity-90 transition duration-200 flex justify-center items-center"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
            )}
            {loading ? "Saving..." : "Save Medicines"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;

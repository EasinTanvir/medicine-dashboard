"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MdPersonAddAlt1 } from "react-icons/md";
import toast from "react-hot-toast";
import api from "@/libs/api";

const CustomerForm = ({
  allCompanies = [],
  existingCustomer = null,
  onClose,
}) => {
  const isEditMode = true;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      medicines: [{ medicineName: "", quantity: 1, companyId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  // 🧠 Pre-fill data in edit mode
  useEffect(() => {
    if (existingCustomer) {
      reset({
        customerName: existingCustomer.customerName || "",
        customerPhone: existingCustomer.customerPhone || "",
        customerAddress: existingCustomer.customerAddress || "",
        medicines: existingCustomer.medicines?.map((m) => ({
          medicineName: m.medicineName || "",
          quantity: m.quantity || 1,
          companyId: m.company?.id || "",
        })) || [{ medicineName: "", quantity: 1, companyId: "" }],
      });
    }
  }, [existingCustomer, reset]);

  // 🧾 Handle form submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        customerName: data.customerName,
        customerPhone: data.customerPhone || null,
        customerAddress: data.customerAddress || null,
        medicines: data.medicines.map((m) => ({
          medicineName: m.medicineName,
          quantity: Number(m.quantity) || 1,
          companyId: m.companyId || null,
        })),
      };

      let res;
      if (isEditMode) {
        // 🟡 Update customer
        res = await api.put("/api/customer", {
          id: existingCustomer.id,
          ...payload,
        });
      } else {
        // 🟢 Create new customer
        res = await api.post("/api/customer", payload);
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(
          isEditMode
            ? "Customer updated successfully!"
            : "Customer added successfully!"
        );
        if (onClose) onClose();
        reset();
      }
    } catch (error) {
      console.error("❌ Error saving customer:", error);
      const message =
        error.response?.data?.error ||
        `Failed to ${isEditMode ? "update" : "add"} customer.`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white  shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MdPersonAddAlt1 className="text-blue-500 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? "Edit Customer" : "Add Customer"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Customer Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-blue-500 pl-2">
            Customer Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("customerName", {
                  required: "Customer name is required",
                })}
                className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.customerName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.customerName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.customerName.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone (optional)
              </label>
              <input
                type="text"
                {...register("customerPhone")}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address (optional)
              </label>
              <textarea
                {...register("customerAddress")}
                rows={3}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Medicine Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-green-500 pl-2">
            Medicine Information
          </h3>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4 border border-gray-100 p-4 rounded-xl bg-gray-50"
            >
              {/* Medicine Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Medicine Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register(`medicines.${index}.medicineName`, {
                    required: "Medicine name is required",
                  })}
                  className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.medicines?.[index]?.medicineName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.medicines?.[index]?.medicineName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.medicines[index].medicineName.message}
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
                  {...register(`medicines.${index}.quantity`, {
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.medicines?.[index]?.quantity
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>

              {/* Company Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Company (optional)
                </label>
                <select
                  {...register(`medicines.${index}.companyId`)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
                >
                  <option value="">Select company</option>
                  {allCompanies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Button */}
              {fields.length > 1 && (
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Medicine Button */}
          <button
            type="button"
            onClick={() =>
              append({ medicineName: "", quantity: 1, companyId: "" })
            }
            className="mt-2 text-sm font-semibold text-green-600 hover:text-green-700"
          >
            + Add More Medicine
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-linear-to-r from-blue-600 to-green-500 text-white font-semibold py-3 rounded-md transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Save Changes"
              : "Add Customer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;

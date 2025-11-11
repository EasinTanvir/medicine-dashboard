"use client";

import { companies } from "@/dummydata";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MdPersonAddAlt1 } from "react-icons/md";

const AddCustomerForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      medicines: [{ medicineName: "", quantity: 1, brand: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  const onSubmit = (data) => {
    console.log("✅ Customer Data:", data);
    alert("Customer with medicine details added successfully!");
    reset();
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MdPersonAddAlt1 className="text-blue-500 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Add Customer</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Customer Info Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-blue-500 pl-2">
            Customer Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter customer name"
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

            {/* Customer Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone (optional)
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("customerPhone")}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>

            {/* Customer Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address (optional)
              </label>
              <textarea
                placeholder="Enter address"
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
                  placeholder="Enter medicine name"
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
                  defaultValue={1}
                  {...register(`medicines.${index}.quantity`, {
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.medicines?.[index]?.quantity
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.medicines?.[index]?.quantity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.medicines[index].quantity.message}
                  </p>
                )}
              </div>

              {/* Company Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Company (optional)
                </label>
                <select
                  defaultValue=""
                  {...register(`medicines.${index}.brand`)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
                >
                  <option value="" disabled>
                    Select company
                  </option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.slug}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Remove Button (if more than one) */}
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

          {/* Add More Medicine Button */}
          <button
            type="button"
            onClick={() => append({ medicineName: "", quantity: 1, brand: "" })}
            className="mt-2 text-sm font-semibold text-green-600 hover:text-green-700"
          >
            + Add More Medicine
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-green-500 text-white font-semibold py-3 rounded-md hover:opacity-90 transition duration-200"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;

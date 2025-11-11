"use client";

import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { MdPointOfSale } from "react-icons/md";

const companies = [
  { id: 1, name: "Square Pharmaceuticals Ltd.", slug: "square" },
  { id: 2, name: "Incepta Pharmaceuticals Ltd.", slug: "incepta" },
  { id: 3, name: "Beximco Pharmaceuticals Ltd.", slug: "beximco" },
  { id: 4, name: "Renata Limited", slug: "renata" },
  { id: 5, name: "Eskayef Pharmaceuticals Ltd.", slug: "eskayef" },
  { id: 6, name: "ACI Limited", slug: "aci" },
  { id: 7, name: "Opsonin Pharma Limited", slug: "opsonin" },
  { id: 8, name: "Healthcare Pharmaceuticals Ltd.", slug: "healthcare" },
  { id: 9, name: "Aristopharma Ltd.", slug: "aristopharma" },
  { id: 10, name: "General Pharmaceuticals Ltd.", slug: "general" },
];

const AddSalesForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sales: [
        {
          medicineName: "",
          company: "",
          quantity: 1,
          price: 0,
          date: new Date().toISOString().slice(0, 10),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sales",
  });

  const sales = useWatch({ control, name: "sales" });

  const calculateSubtotal = (s) =>
    (Number(s.quantity) || 0) * (Number(s.price) || 0);

  const grandTotal = sales?.reduce((acc, s) => acc + calculateSubtotal(s), 0);

  const onSubmit = (data) => {
    console.log("✅ Sales Data Submitted:", data);
    alert("Sales record saved successfully!");
    reset();
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MdPointOfSale className="text-pink-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Record Sales</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => {
          const subtotal = calculateSubtotal(sales[index] || {});
          return (
            <div
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-4 border border-gray-100 p-4 rounded-xl bg-gray-50"
            >
              {/* Medicine Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Medicine Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter medicine name"
                  {...register(`sales.${index}.medicineName`, {
                    required: "Medicine name is required",
                  })}
                  className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.sales?.[index]?.medicineName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.sales?.[index]?.medicineName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.sales[index].medicineName.message}
                  </p>
                )}
              </div>

              {/* Company Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Company (optional)
                </label>
                <select
                  {...register(`sales.${index}.company`)}
                  defaultValue=""
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 border-gray-300 bg-white"
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

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  {...register(`sales.${index}.quantity`, {
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.sales?.[index]?.quantity
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price (৳)
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  {...register(`sales.${index}.price`)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 border-gray-300"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  {...register(`sales.${index}.date`)}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 border-gray-300"
                />
              </div>

              {/* Subtotal */}
              <div className="sm:col-span-5 flex justify-between items-center mt-3">
                <p className="text-sm font-medium text-gray-600">Subtotal:</p>
                <p className="text-lg font-semibold text-pink-600">
                  ৳ {subtotal.toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              {fields.length > 1 && (
                <div className="sm:col-span-5 flex justify-end">
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

        {/* Add More Button */}
        <button
          type="button"
          onClick={() =>
            append({
              medicineName: "",
              company: "",
              quantity: 1,
              price: 0,
              date: new Date().toISOString().slice(0, 10),
            })
          }
          className="mt-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          + Add More Medicine
        </button>

        {/* Grand Total */}
        <div className="border-t pt-4 mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">Grand Total:</p>
          <p className="text-2xl font-bold text-pink-600">
            ৳ {grandTotal.toFixed(2)}
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-linear-to-r from-pink-600 to-rose-500 text-white font-semibold py-3 rounded-md hover:opacity-90 transition duration-200"
          >
            Save Sale Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalesForm;

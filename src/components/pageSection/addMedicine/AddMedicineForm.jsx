"use client";

import { companies } from "@/dummydata";
import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { MdOutlineLocalPharmacy } from "react-icons/md";

const AddMedicineForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      medicines: [{ name: "", quantity: 1, price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  // Watch medicines array for live calculation
  const medicines = useWatch({ control, name: "medicines" });

  // Calculate subtotal for each item
  const calculateSubtotal = (m) =>
    (Number(m.quantity) || 0) * (Number(m.price) || 0);

  // Calculate grand total
  const grandTotal = medicines?.reduce(
    (acc, m) => acc + calculateSubtotal(m),
    0
  );

  const onSubmit = (data) => {
    console.log("✅ Medicine Data Submitted:", data);
    alert("Medicine list saved successfully!");
    reset();
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300 max-w-3xl mx-auto">
      {/* Header */}
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
            {...register("company", { required: "Company is required" })}
            defaultValue=""
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Choose a company
            </option>
            {companies.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.company && (
            <p className="text-sm text-red-500 mt-1">
              {errors.company.message}
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
                    Quantity (optional)
                  </label>
                  <input
                    type="number"
                    defaultValue={1}
                    {...register(`medicines.${index}.quantity`)}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
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
                    {...register(`medicines.${index}.price`)}
                    className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                  />
                </div>

                {/* Subtotal */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Subtotal (৳)
                  </label>
                  <input
                    type="text"
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

          {/* Add More Button */}
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

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-linear-to-r from-green-600 to-emerald-500 text-white font-semibold py-3 rounded-md hover:opacity-90 transition duration-200"
          >
            Save Medicines
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineForm;

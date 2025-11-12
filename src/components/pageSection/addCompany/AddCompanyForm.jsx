"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineBusiness } from "react-icons/md";
import api from "@/libs/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCompanyForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      address: "",
      representativeName: "",
      representativePhone: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // 🧾 API call
      const res = await api.post("/api/company", data);

      if (res.status === 201) {
        toast.success("✅ Company added successfully!");
        reset();
        router.push("/companies");
        router.refresh();
      }
    } catch (error) {
      console.error("❌ Error creating company:", error);
      const message =
        error.response?.data?.error ||
        "Something went wrong while adding company.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition duration-300 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MdOutlineBusiness className="text-indigo-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Add Company</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-indigo-500 pl-2">
            Company Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Company Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address (optional)
              </label>
              <textarea
                placeholder="Enter address"
                {...register("address")}
                rows={3}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Representative Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-l-4 border-purple-500 pl-2">
            Medical Representative Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Representative Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Representative Name (optional)
              </label>
              <input
                type="text"
                placeholder="Enter representative name"
                {...register("representativeName")}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
              />
            </div>

            {/* Representative Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Representative Phone (optional)
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("representativePhone")}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-linear-to-r from-indigo-600 to-purple-500 text-white font-semibold py-3 rounded-md transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Adding Company..." : "Add Company"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyForm;

import Link from "next/link";
import React from "react";
import { MdPeopleOutline } from "react-icons/md";

const CustomersCard = ({ data }) => {
  const total = data.length;
  const pending = data.filter((c) => c.status === "pending").length;

  return (
    <Link
      prefetch
      href="/customers"
      className="relative p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* 🔵 Gradient Accent Bars */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-indigo-600 rounded-t-2xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <MdPeopleOutline className="text-blue-500 w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Customers</h2>
            <p className="text-sm text-gray-500">Customer Overview</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-between items-end">
        <div>
          <p className="text-4xl font-bold text-gray-900">{total}</p>
          <p className="text-gray-500 text-sm">Total Customers</p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-600 mb-1">
            Pending
          </span>
          <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-lg shadow-sm border border-blue-200">
            {pending}
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-indigo-600 to-blue-500 rounded-b-2xl"></div>
    </Link>
  );
};

export default CustomersCard;

import React from "react";
import { MdPointOfSale } from "react-icons/md";

const SalesCard = ({ data = [] }) => {
  // 🧮 Calculate totals safely
  const totalAmount = data.reduce((sum, s) => sum + (s.subTotal || 0), 0);
  const totalRecords = data.length;

  // 🏢 Distinct companies
  const uniqueCompanies = new Set(
    data.map((s) => s.company?.companyName).filter(Boolean)
  ).size;

  return (
    <div className="relative p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 flex flex-col justify-between overflow-hidden">
      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 to-rose-600 rounded-t-2xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <MdPointOfSale className="text-pink-500 w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Sales</h2>
            <p className="text-sm text-gray-500">Sales Overview</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 flex justify-between items-end">
        <div>
          <p className="text-4xl font-bold text-gray-900">
            ৳ {totalAmount.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Total Sales ({totalRecords} records)
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-gray-600 mb-1">
            Companies
          </span>
          <div className="px-4 py-2 rounded-full bg-pink-50 text-pink-700 font-semibold text-lg shadow-sm border border-pink-200">
            {uniqueCompanies}
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-rose-600 to-pink-500 rounded-b-2xl"></div>
    </div>
  );
};

export default SalesCard;

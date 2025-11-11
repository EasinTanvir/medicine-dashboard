import React from "react";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const CustomerCard = ({ customer, onDelete, onDone }) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-green-500"></div>

      <div className="p-5 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {customer.customerName}
            </h3>
            <p className="text-sm text-gray-500">
              {customer.customerPhone || "No phone"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {customer.customerAddress || "No address"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">Customer ID</p>
            <p className="font-mono text-sm text-gray-700">{customer.id}</p>
          </div>
        </div>

        {/* Medicines Section */}
        <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Medicines</p>

          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            {customer.medicines.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-md px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {m.medicineName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Company:{" "}
                    <span className="font-medium text-gray-700">
                      {m.brandName}
                    </span>
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Qty: {m.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">
          <button
            onClick={() => onDone && onDone(customer.id)}
            className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-4 py-2 rounded-md text-sm transition-all duration-200"
          >
            <MdDone className="w-4 h-4" /> Done
          </button>

          <button
            onClick={() => onDelete && onDelete(customer.id)}
            className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-md text-sm transition-all duration-200"
          >
            <MdDeleteOutline className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-green-500 to-blue-500"></div>
    </div>
  );
};

export default CustomerCard;

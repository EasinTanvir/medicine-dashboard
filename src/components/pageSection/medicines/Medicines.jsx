"use client";

import { companies } from "@/dummydata";
import React, { useState, useMemo } from "react";
import { MdOutlineLocalPharmacy } from "react-icons/md";

// Dummy dataset (simulate 5 companies with random medicines)
const medicineData = [
  {
    company: "square",
    medicines: [
      { id: 1, name: "Paracetamol 500mg", quantity: 120, price: 2.5 },
      { id: 2, name: "Napa Extra", quantity: 200, price: 3.5 },
      { id: 3, name: "Ace Plus", quantity: 150, price: 3.0 },
    ],
  },
  {
    company: "incepta",
    medicines: [
      { id: 1, name: "Azithromycin 500mg", quantity: 80, price: 12 },
      { id: 2, name: "Ceftriaxone 1g", quantity: 60, price: 15 },
      { id: 3, name: "Cough Syrup", quantity: 100, price: 5 },
    ],
  },
  {
    company: "beximco",
    medicines: [
      { id: 1, name: "Nexum 20mg", quantity: 130, price: 8 },
      { id: 2, name: "Maxpro 40mg", quantity: 90, price: 9 },
      { id: 3, name: "Losectil", quantity: 70, price: 7.5 },
    ],
  },
  {
    company: "renata",
    medicines: [
      { id: 1, name: "Histacin", quantity: 140, price: 2 },
      { id: 2, name: "Antacid", quantity: 160, price: 3 },
      { id: 3, name: "Vitamin B Complex", quantity: 90, price: 5 },
    ],
  },
  {
    company: "aci",
    medicines: [
      { id: 1, name: "Savlon", quantity: 200, price: 10 },
      { id: 2, name: "Pain Balm", quantity: 120, price: 6 },
      { id: 3, name: "Hand Sanitizer", quantity: 250, price: 4 },
    ],
  },
];

const MedicineList = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0].slug);

  const currentCompany = useMemo(() => {
    const company = companies.find((c) => c.slug === selectedCompany);
    const medicines = medicineData.find((m) => m.company === selectedCompany);
    return {
      name: company?.name || "",
      medicines: medicines?.medicines || [],
    };
  }, [selectedCompany]);

  // Calculate total value
  const grandTotal = currentCompany.medicines.reduce(
    (acc, m) => acc + m.price * m.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdOutlineLocalPharmacy className="text-green-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Medicine List</h2>
      </div>

      {/* Company Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Company
        </label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full sm:w-1/2 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 border-gray-300 bg-white"
        >
          {companies.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Company Overview */}
      <div className="mb-6 p-4 border border-green-100 rounded-xl bg-green-50">
        <h3 className="text-lg font-semibold text-green-700">
          {currentCompany.name}
        </h3>
        <p className="text-sm text-gray-600">
          Showing <strong>{currentCompany.medicines.length}</strong> medicines
          under this company.
        </p>
      </div>

      {/* Medicine Grid */}
      {currentCompany.medicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCompany.medicines.map((m) => (
            <div
              key={m.id}
              className="relative bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-500 to-emerald-600 rounded-t-xl"></div>

              <div className="mt-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {m.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity:{" "}
                  <span className="font-medium text-gray-800">
                    {m.quantity}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Price per unit:{" "}
                  <span className="font-medium text-gray-800">৳ {m.price}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">Subtotal:</p>
                <p className="text-lg font-semibold text-green-600">
                  ৳ {(m.price * m.quantity).toFixed(2)}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-emerald-600 to-green-500 rounded-b-xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No medicines found.</p>
      )}

      {/* Grand Total */}
      <div className="mt-10 p-5 border-t border-gray-100 flex justify-between items-center bg-green-50 rounded-xl">
        <p className="text-lg font-semibold text-gray-800">Grand Total:</p>
        <p className="text-2xl font-bold text-green-700">
          ৳ {grandTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default MedicineList;

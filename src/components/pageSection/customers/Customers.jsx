"use client";

import React, { useMemo, useState } from "react";
import CustomerCard from "./CustomerCard";

const Customers = ({ allCustomers }) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCustomers;

    return allCustomers.filter((c) => {
      const nameMatch = c.customerName.toLowerCase().includes(q);
      const phoneMatch = (c.customerPhone || "").toLowerCase().includes(q);
      const medicineMatch = c.medicines.some(
        (m) =>
          (m.medicineName || "").toLowerCase().includes(q) ||
          (m.company?.companyName || "").toLowerCase().includes(q)
      );
      return nameMatch || phoneMatch || medicineMatch;
    });
  }, [query, allCustomers]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>

      <div className="mb-6 flex gap-3 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone or medicine..."
          className="w-full max-w-lg border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={() => setQuery("")} className="text-sm text-gray-600">
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <CustomerCard key={c.id} customer={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">
          No customers matched your search.
        </p>
      )}
    </div>
  );
};

export default Customers;

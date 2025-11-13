"use client";

import React, { useMemo, useState } from "react";
import CustomerCard from "./CustomerCard";
import EmptyState from "@/components/shared/EmptyState";
import { MdSearchOff } from "react-icons/md";
import Link from "next/link";

const Customers = ({ allCustomers, allCompanies }) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // default: pending

  // 🧠 Filter logic: by search query + status
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allCustomers.filter((c) => {
      const matchesStatus =
        statusFilter === "all" ? true : c.status === statusFilter;

      const nameMatch = c.customerName.toLowerCase().includes(q);
      const phoneMatch = (c.customerPhone || "").toLowerCase().includes(q);
      const medicineMatch = c.medicines.some(
        (m) =>
          (m.medicineName || "").toLowerCase().includes(q) ||
          (m.company?.companyName || "").toLowerCase().includes(q)
      );

      return matchesStatus && (nameMatch || phoneMatch || medicineMatch);
    });
  }, [query, statusFilter, allCustomers]);

  // 🟢 Summary stats
  const totalMedicines = allCustomers.reduce(
    (acc, c) => acc + c.medicines.length,
    0
  );
  const pendingCustomers = allCustomers.filter(
    (c) => c.status === "pending"
  ).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>

      {/* ✅ Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h3 className="text-sm text-gray-600">Total Customers</h3>
          <p className="text-2xl font-bold text-blue-700">
            {allCustomers.length}
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <h3 className="text-sm text-gray-600">Pending Customers</h3>
          <p className="text-2xl font-bold text-yellow-700">
            {pendingCustomers}
          </p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <h3 className="text-sm text-gray-600">Total Medicines</h3>
          <p className="text-2xl font-bold text-green-700">{totalMedicines}</p>
        </div>
      </div>

      {/* 🔍 Search + Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone or medicine..."
          className="w-full sm:max-w-md border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        {/* Reset */}
        <button
          onClick={() => {
            setQuery("");
            setStatusFilter("pending");
          }}
          className="text-sm text-gray-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <CustomerCard key={c.id} customer={c} allCompanies={allCompanies} />
        ))}
      </div>

      <div className="pt-16 space-y-10">
        {filtered.length === 0 && (
          <EmptyState
            title="No Customer Found Under This Category"
            subtitle="There are no customers matching your current filters."
            color="red"
          />
        )}

        <div className=" flex justify-center">
          <Link
            className="bg-black text-white rounded-2xl py-2 px-10"
            href="/add-customer"
          >
            Add Customer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customers;

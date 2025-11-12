"use client";

import React, { useMemo, useState } from "react";
import { MdPointOfSale } from "react-icons/md";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Sales = ({ allSales = [], allCompanies = [] }) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [range, setRange] = useState({
    from: dayjs().subtract(6, "day").toDate(),
    to: dayjs().toDate(),
  });

  // 🧮 Filtered Sales (Frontend Only)
  const filteredSales = useMemo(() => {
    let filtered = [...allSales];

    // Filter by company
    if (selectedCompany) {
      filtered = filtered.filter((s) => s.companyId === selectedCompany);
    }

    // Filter by date
    if (range?.from && range?.to) {
      filtered = filtered.filter((s) => {
        const d = dayjs(s.date);
        return (
          d.isAfter(dayjs(range.from).subtract(1, "day")) &&
          d.isBefore(dayjs(range.to).add(1, "day"))
        );
      });
    }

    return filtered;
  }, [selectedCompany, range, allSales]);

  // 🧾 Totals
  const totalRecords = filteredSales.length;
  const totalQuantity = filteredSales.reduce((sum, s) => sum + s.quantity, 0);
  const totalValue = filteredSales.reduce((sum, s) => sum + s.subTotal, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdPointOfSale className="text-pink-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Sales Records</h2>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Company Dropdown */}
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            >
              <option value="">All Companies</option>
              {allCompanies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Picker */}
          <div className="border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Filter by Date Range
            </h3>
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              defaultMonth={dayjs().toDate()}
              numberOfMonths={2}
              styles={{
                day_selected: { backgroundColor: "#ec4899", color: "white" },
                day_today: { border: "1px solid #ec4899" },
              }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredSales.length > 0 ? (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-left px-4 py-3 font-semibold">Medicine</th>
                <th className="text-left px-4 py-3 font-semibold">Company</th>
                <th className="text-right px-4 py-3 font-semibold">Qty</th>
                <th className="text-right px-4 py-3 font-semibold">
                  Price (৳)
                </th>
                <th className="text-right px-4 py-3 font-semibold">
                  Subtotal (৳)
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-100 hover:bg-pink-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">
                    {dayjs(s.date).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {s.medicineName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {s.company?.companyName || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {s.quantity}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {s.price}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-pink-600">
                    {s.subTotal.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Footer */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-pink-50 px-5 py-4 gap-2">
            <p className="text-gray-700 font-medium">
              Total Records:{" "}
              <span className="text-pink-600 font-semibold">
                {totalRecords}
              </span>
            </p>
            <p className="text-gray-700 font-medium">
              Total Quantity:{" "}
              <span className="text-pink-600 font-semibold">
                {totalQuantity}
              </span>
            </p>
            <p className="text-lg font-semibold text-pink-700">
              Total Value: ৳ {totalValue.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            No sales found within this filter
          </p>
          <p className="text-sm text-gray-500">
            Try selecting a different date range or company.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sales;

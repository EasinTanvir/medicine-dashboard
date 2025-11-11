"use client";

import React, { useMemo, useState } from "react";
import { MdPointOfSale } from "react-icons/md";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const companies = [
  "square",
  "incepta",
  "beximco",
  "renata",
  "aci",
  "eskayef",
  "healthcare",
  "aristopharma",
];

// 🧩 Dummy sales dataset — 15 sales in last 40 days
const generateDummySales = () => {
  const medicines = [
    "Paracetamol 500mg",
    "Napa Extra",
    "Losectil",
    "Azithromycin 500mg",
    "Savlon",
    "Maxpro 40mg",
    "Histacin",
    "Vitamin B Complex",
    "Cough Syrup",
    "Antacid",
    "Pain Balm",
    "Hand Sanitizer",
    "Nexum 20mg",
    "Ace Plus",
    "Ceftriaxone 1g",
  ];
  const data = [];
  for (let i = 0; i < 15; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 40);
    const quantity = Math.floor(Math.random() * 20) + 1;
    const price = Math.floor(Math.random() * 50) + 5;
    data.push({
      id: i + 1,
      medicineName: medicines[i],
      company: companies[Math.floor(Math.random() * companies.length)],
      quantity,
      price,
      subtotal: quantity * price,
      date: dayjs().subtract(randomDaysAgo, "day").format("YYYY-MM-DD"),
    });
  }
  return data;
};

const SalesList = () => {
  const [sales] = useState(generateDummySales);

  // Default range → last 7 days
  const [range, setRange] = useState({
    from: dayjs().subtract(6, "day").toDate(),
    to: dayjs().toDate(),
  });

  // Filter by date range
  const filteredSales = useMemo(() => {
    if (!range?.from || !range?.to) return [];
    return sales.filter((sale) => {
      const saleDate = dayjs(sale.date);
      return (
        saleDate.isAfter(dayjs(range.from).subtract(1, "day")) &&
        saleDate.isBefore(dayjs(range.to).add(1, "day"))
      );
    });
  }, [range, sales]);

  // Totals
  const totalAmount = filteredSales.reduce((acc, s) => acc + s.subtotal, 0);
  const totalSales = filteredSales.length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdPointOfSale className="text-pink-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">Sales Records</h2>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Filter by Date Range
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="text-sm text-gray-600">
            <p className="mb-1">Showing Sales:</p>
            <p className="font-medium text-gray-800">
              {range?.from && range?.to
                ? `${dayjs(range.from).format("DD MMM YYYY")} → ${dayjs(
                    range.to
                  ).format("DD MMM YYYY")}`
                : "No range selected"}
            </p>
          </div>

          {/* Calendar Picker */}
          <div className="border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-50">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              defaultMonth={dayjs().toDate()}
              numberOfMonths={2}
              footer={
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Select a start and end date
                </p>
              }
              styles={{
                caption: { color: "#111827" },
                day_selected: {
                  backgroundColor: "#ec4899",
                  color: "white",
                },
                day_today: {
                  border: "1px solid #ec4899",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Sales Table */}
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
                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {s.company}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {s.quantity}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {s.price}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-pink-600">
                    {s.subtotal.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Summary */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-pink-50 px-5 py-4 gap-2">
            <p className="text-gray-700 font-medium">
              Total Sales Records:{" "}
              <span className="text-pink-600 font-semibold">{totalSales}</span>
            </p>
            <p className="text-lg font-semibold text-pink-700">
              Total Sales Amount: ৳ {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            No sales found within this date range
          </p>
          <p className="text-sm text-gray-500">
            Try selecting a different date range from the calendar above.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesList;

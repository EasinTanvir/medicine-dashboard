"use client";

import React, { useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import "react-day-picker/dist/style.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const EarningsChart = ({ sales = [] }) => {
  const [range, setRange] = useState({
    from: dayjs().subtract(29, "day").toDate(),
    to: dayjs().toDate(),
  });
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // 🧩 Close calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧮 Filter by date range
  const filteredSales = useMemo(() => {
    if (!range?.from || !range?.to) return [];
    return sales.filter((s) => {
      const saleDate = dayjs(s.date);
      return (
        saleDate.isAfter(dayjs(range.from).subtract(1, "day")) &&
        saleDate.isBefore(dayjs(range.to).add(1, "day"))
      );
    });
  }, [range, sales]);

  // 🧾 Group by date
  const dailyTotals = useMemo(() => {
    const totals = {};
    filteredSales.forEach((sale) => {
      const dateKey = dayjs(sale.date).format("YYYY-MM-DD");
      totals[dateKey] = (totals[dateKey] || 0) + (sale.subTotal || 0);
    });
    return Object.entries(totals)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, total]) => ({ date, total }));
  }, [filteredSales]);

  // 🎨 Chart Data
  const chartData = {
    labels: dailyTotals.map((d) => dayjs(d.date).format("DD MMM")),
    datasets: [
      {
        label: "Total Earnings (৳)",
        data: dailyTotals.map((d) => d.total),
        backgroundColor: "rgba(52, 211, 153, 0.8)", // ✅ visible green
        borderColor: "rgba(5, 150, 105, 1)",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(16, 185, 129, 1)",
      },
    ],
  };

  // ⚙️ Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleFont: { weight: "bold" },
        callbacks: {
          label: (context) => `৳ ${context.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#374151" },
        grid: { color: "rgba(229,231,235,0.4)" },
      },
      x: {
        ticks: { color: "#6B7280" },
        grid: { display: false },
      },
    },
  };

  // 🗓️ Text for selected range
  const rangeText = `${dayjs(range.from).format("DD MMM YYYY")} → ${dayjs(
    range.to
  ).format("DD MMM YYYY")}`;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Earnings Overview
        </h3>

        {/* 📅 Range Button */}
        <div className="relative" ref={pickerRef}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded-md shadow-sm transition flex items-center gap-2"
          >
            {range.from && range.to ? rangeText : "Select Date Range"}
          </button>

          {/* Date Picker Popover */}
          {showPicker && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
              <DayPicker
                mode="range"
                numberOfMonths={2}
                selected={range}
                onSelect={(selected) => {
                  setRange(selected);
                  if (selected?.from && selected?.to) setShowPicker(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px]">
        {dailyTotals.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <div className="text-center text-gray-500 mt-16">
            No sales data found for the selected range.
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsChart;

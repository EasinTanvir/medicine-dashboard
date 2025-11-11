"use client";

import React, { useMemo, useState } from "react";
import { MdOutlineBusiness, MdPerson, MdCall } from "react-icons/md";

// 🧩 Dummy company data
const companiesData = [
  {
    id: 1,
    name: "Square Pharmaceuticals Ltd.",
    address: "48, Mohakhali, Dhaka-1212",
    representativeName: "Rahim Uddin",
    representativePhone: "01710000001",
  },
  {
    id: 2,
    name: "Incepta Pharmaceuticals Ltd.",
    address: "40, Tejgaon I/A, Dhaka-1208",
    representativeName: "Karim Ahmed",
    representativePhone: "01710000002",
  },
  {
    id: 3,
    name: "Beximco Pharmaceuticals Ltd.",
    address: "19 Dhanmondi, Dhaka",
    representativeName: "Nusrat Jahan",
    representativePhone: "01710000003",
  },
  {
    id: 4,
    name: "Renata Limited",
    address: "Mirpur DOHS, Dhaka",
    representativeName: "Javed Khan",
    representativePhone: "01710000004",
  },
  {
    id: 5,
    name: "Eskayef Pharmaceuticals Ltd.",
    address: "Banani, Dhaka",
    representativeName: "Mita Roy",
    representativePhone: "01710000005",
  },
  {
    id: 6,
    name: "ACI Limited",
    address: "Tejgaon, Dhaka",
    representativeName: "Farhana Islam",
    representativePhone: "01710000006",
  },
  {
    id: 7,
    name: "Opsonin Pharma Limited",
    address: "Moghbazar, Dhaka",
    representativeName: "Imran Mir",
    representativePhone: "01710000007",
  },
  {
    id: 8,
    name: "Healthcare Pharmaceuticals Ltd.",
    address: "Uttara, Dhaka",
    representativeName: "Kamal Hossain",
    representativePhone: "01710000008",
  },
  {
    id: 9,
    name: "Aristopharma Ltd.",
    address: "Dhanmondi, Dhaka",
    representativeName: "Shamima Noor",
    representativePhone: "01710000009",
  },
  {
    id: 10,
    name: "General Pharmaceuticals Ltd.",
    address: "Badda, Dhaka",
    representativeName: "Rubel Rana",
    representativePhone: "01710000010",
  },
];

const Companies = () => {
  const [query, setQuery] = useState("");

  // Filter logic
  const filteredCompanies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companiesData;
    return companiesData.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.representativeName &&
          c.representativeName.toLowerCase().includes(q)) ||
        (c.representativePhone &&
          c.representativePhone.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MdOutlineBusiness className="text-indigo-600 w-8 h-8" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Company Directory
        </h2>
      </div>

      {/* Search Input */}
      <div className="mb-8 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by company name, representative name, or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-2/3 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-sm text-gray-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="relative bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-600 to-purple-500 rounded-t-xl"></div>

              {/* Company Name */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {company.address || "No address provided"}
                </p>
              </div>

              {/* Representative Info */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex items-center gap-2 text-gray-700 mb-1">
                  <MdPerson className="text-purple-600" />
                  <p className="text-sm font-medium">
                    {company.representativeName || "No representative"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MdCall className="text-green-600" />
                  <p className="text-sm">
                    {company.representativePhone || "No phone available"}
                  </p>
                </div>
              </div>

              {/* Bottom gradient bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-indigo-600 rounded-b-xl"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10 text-center">
          No companies found matching your search.
        </p>
      )}
    </div>
  );
};

export default Companies;

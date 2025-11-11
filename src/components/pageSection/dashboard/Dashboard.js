"use client";

import React from "react";
import CustomersCard from "./CustomersCard/CustomersCard";
import MedicinesCard from "./MedicinesCard/MedicinesCard";
import SalesCard from "./SalesCard/SalesCard";
import CompanyCard from "./CompanyCard/CompanyCard";

const Dashboard = () => {
  const customersData = [
    { id: 1, name: "John Doe", status: "active" },
    { id: 2, name: "Jane Smith", status: "pending" },
    { id: 3, name: "Alice", status: "pending" },
    { id: 4, name: "Bob", status: "active" },
  ];

  const medicinesData = [
    { id: 1, name: "Paracetamol", status: "available" },
    { id: 2, name: "Ibuprofen", status: "pending" },
    { id: 3, name: "Amoxicillin", status: "available" },
    { id: 4, name: "Cough Syrup", status: "pending" },
  ];

  const salesData = [
    { id: 1, amount: 450 },
    { id: 2, amount: 300 },
    { id: 3, amount: 220 },
    { id: 4, amount: 120 },
  ];

  const companyData = [
    { id: 1, name: "Square Pharma", status: "active" },
    { id: 2, name: "Incepta", status: "active" },
    { id: 3, name: "Beximco", status: "pending" },
    { id: 4, name: "Renata", status: "active" },
  ];

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Analytics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        <CustomersCard data={customersData} />
        <MedicinesCard data={medicinesData} />
        <SalesCard data={salesData} />
        <CompanyCard data={companyData} />
      </div>
    </div>
  );
};

export default Dashboard;

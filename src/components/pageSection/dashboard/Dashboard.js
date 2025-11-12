import React from "react";
import CustomersCard from "./CustomersCard/CustomersCard";
import MedicinesCard from "./MedicinesCard/MedicinesCard";
import SalesCard from "./SalesCard/SalesCard";
import CompanyCard from "./CompanyCard/CompanyCard";

const Dashboard = ({ customers, medicines, sales, companies }) => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Analytics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CustomersCard data={customers} />
        <MedicinesCard data={medicines} />
        <SalesCard data={sales} />
        <CompanyCard data={companies} />
      </div>
    </div>
  );
};

export default Dashboard;

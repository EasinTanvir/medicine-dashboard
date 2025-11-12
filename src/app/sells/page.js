import Sales from "@/components/pageSection/sales/Sales";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const SalesPage = async () => {
  const [allCompanies, allSales] = await Promise.all([
    fetchData(`${BASE_URL}/api/company`, {
      cache: "force-cache",
      next: { tags: ["company"] },
    }),
    fetchData(`${BASE_URL}/api/sells`, {
      cache: "no-store", // always latest sales data
      next: { tags: ["sales"] },
    }),
  ]);

  return (
    <div>
      <Sales allCompanies={allCompanies} allSales={allSales.sales || []} />
    </div>
  );
};

export default SalesPage;

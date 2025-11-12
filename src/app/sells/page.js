import Sales from "@/components/pageSection/sales/Sales";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const SalesPage = async () => {
  const [allCompanies, allSales] = await Promise.all([
    fetchData(`${BASE_URL}/api/company`, {
      next: { tags: ["company"], revalidate: CACHING_TIME },
    }),
    fetchData(`${BASE_URL}/api/sells`, {
      next: { revalidate: CACHING_TIME, tags: ["sells"] },
    }),
  ]);

  return (
    <div>
      <Sales allCompanies={allCompanies} allSales={allSales.sales || []} />
    </div>
  );
};

export default SalesPage;

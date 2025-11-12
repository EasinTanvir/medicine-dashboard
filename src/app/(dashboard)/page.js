import Dashboard from "@/components/pageSection/dashboard/Dashboard";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const DashBoardPage = async () => {
  const [customers, medicines, sales, companies] = await Promise.all([
    fetchData(`${BASE_URL}/api/customer`, {
      next: { revalidate: CACHING_TIME, tags: ["customer"] },
    }),
    fetchData(`${BASE_URL}/api/medicine`, {
      next: { revalidate: CACHING_TIME, tags: ["medicine"] },
    }),
    fetchData(`${BASE_URL}/api/sells`, {
      next: { revalidate: CACHING_TIME, tags: ["sells"] },
    }),
    fetchData(`${BASE_URL}/api/company`, {
      next: { revalidate: CACHING_TIME, tags: ["company"] },
    }),
  ]);

  return (
    <div>
      <Dashboard
        customers={customers}
        medicines={medicines}
        sales={sales.sales || []}
        companies={companies}
      />
    </div>
  );
};

export default DashBoardPage;

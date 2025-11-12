import Dashboard from "@/components/pageSection/dashboard/Dashboard";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const DashBoardPage = async () => {
  const [customers, medicines, sales, companies] = await Promise.all([
    fetchData(`${BASE_URL}/api/customer`, {
      cache: "no-store",
      next: { tags: ["customer"] },
    }),
    fetchData(`${BASE_URL}/api/medicine`, {
      cache: "no-store",
      next: { tags: ["medicine"] },
    }),
    fetchData(`${BASE_URL}/api/sells`, {
      cache: "no-store",
      next: { tags: ["sales"] },
    }),
    fetchData(`${BASE_URL}/api/company`, {
      cache: "force-cache",
      next: { tags: ["company"] },
    }),
  ]);
  console.log("sales", sales);
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

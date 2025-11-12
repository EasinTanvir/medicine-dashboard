export const dynamic = "force-dynamic";
import React from "react";
import AddCustomer from "@/components/pageSection/addCustomer/AddCustomer";
import { fetchData } from "@/libs/fetchHelper";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";

const CustomersPage = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    next: { revalidate: CACHING_TIME, tags: ["company"] },
  });

  return (
    <div className="pt-20">
      <AddCustomer allCompanies={allCompanies} />
    </div>
  );
};

export default CustomersPage;

import React from "react";
import AddCustomer from "@/components/pageSection/addCustomer/AddCustomer";
import { fetchData } from "@/libs/fetchHelper";
import { BASE_URL } from "@/libs/baseUrl";

const CustomersPage = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    cache: "force-cache",
    next: { tags: ["company"] },
  });
  console.log("allCompanies", allCompanies);
  return (
    <div className="pt-20">
      <AddCustomer allCompanies={allCompanies} />
    </div>
  );
};

export default CustomersPage;

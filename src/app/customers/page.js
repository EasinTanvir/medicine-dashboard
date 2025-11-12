import Customers from "@/components/pageSection/customers/Customers";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const CustomersPage = async () => {
  const allCustomers = await fetchData(`${BASE_URL}/api/customer`, {
    cache: "no-store",
    next: { tags: ["customer"] },
  });
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    cache: "force-cache",
    next: { tags: ["company"] },
  });
  return (
    <div>
      <Customers allCustomers={allCustomers} allCompanies={allCompanies} />
    </div>
  );
};

export default CustomersPage;

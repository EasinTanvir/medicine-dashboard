import Customers from "@/components/pageSection/customers/Customers";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const CustomersPage = async () => {
  const allCustomers = await fetchData(`${BASE_URL}/api/customer`, {
    cache: "no-store",
    next: { tags: ["customer"] },
  });
  console.log("allCustomers", allCustomers);
  return (
    <div>
      <Customers allCustomers={allCustomers} />
    </div>
  );
};

export default CustomersPage;

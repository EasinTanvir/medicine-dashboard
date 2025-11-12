import Customers from "@/components/pageSection/customers/Customers";
import DeleteAll from "@/components/shared/DeleteAll";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const CustomersPage = async () => {
  const allCustomers = await fetchData(`${BASE_URL}/api/customer`, {
    next: { revalidate: CACHING_TIME, tags: ["customer"] },
  });
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    next: { revalidate: CACHING_TIME, tags: ["company"] },
  });
  return (
    <div>
      <Customers allCustomers={allCustomers} allCompanies={allCompanies} />
      {allCustomers?.length > 0 && (
        <DeleteAll
          endpoint="/api/customer/resetall"
          title="Reset All Customers"
          tag="customer"
        />
      )}
    </div>
  );
};

export default CustomersPage;

import AddSaleForm from "@/components/pageSection/addSale/AddSaleForm";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const AddSalePage = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    next: { revalidate: CACHING_TIME, tags: ["company"] },
  });

  return (
    <div>
      <AddSaleForm allCompanies={allCompanies} />
    </div>
  );
};

export default AddSalePage;

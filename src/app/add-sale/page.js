import AddSaleForm from "@/components/pageSection/addSale/AddSaleForm";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const AddSalePage = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    cache: "force-cache",
    next: { tags: ["company"] },
  });

  return (
    <div>
      <AddSaleForm allCompanies={allCompanies} />
    </div>
  );
};

export default AddSalePage;

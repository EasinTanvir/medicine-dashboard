import AddMedicineForm from "@/components/pageSection/addMedicine/AddMedicineForm";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const AddMedicine = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    next: { revalidate: CACHING_TIME, tags: ["company"] },
  });

  return (
    <div className="pt-20">
      <AddMedicineForm companies={allCompanies} />
    </div>
  );
};

export default AddMedicine;

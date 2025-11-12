import AddMedicineForm from "@/components/pageSection/addMedicine/AddMedicineForm";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const AddMedicine = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    cache: "force-cache",
    next: { tags: ["company"] },
  });

  return (
    <div className="pt-20">
      <AddMedicineForm companies={allCompanies} />
    </div>
  );
};

export default AddMedicine;

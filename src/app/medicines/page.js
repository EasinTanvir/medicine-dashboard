import Medicines from "@/components/pageSection/medicines/Medicines";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const MedicinePage = async () => {
  const allMedicines = await fetchData(`${BASE_URL}/api/medicine`, {
    cache: "force-cache",
    next: { tags: ["medicine"] },
  });

  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    cache: "force-cache",
    next: { tags: ["company"] },
  });

  console.log("allMedicines", allMedicines);
  return (
    <div>
      <Medicines allMedicines={allMedicines} companies={allCompanies} />
    </div>
  );
};

export default MedicinePage;

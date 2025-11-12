import Medicines from "@/components/pageSection/medicines/Medicines";
import DeleteAll from "@/components/shared/DeleteAll";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const MedicinePage = async () => {
  const allMedicines = await fetchData(`${BASE_URL}/api/medicine`, {
    next: { revalidate: CACHING_TIME, tags: ["medicine"] },
  });

  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    next: { revalidate: CACHING_TIME, tags: ["company"] },
  });

  return (
    <div>
      <Medicines allMedicines={allMedicines} companies={allCompanies} />

      {allMedicines?.length > 0 && (
        <DeleteAll
          endpoint="/api/medicine/resetall"
          title="Reset All Medicines"
          tag="medicine"
        />
      )}
    </div>
  );
};

export default MedicinePage;

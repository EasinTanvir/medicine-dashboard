export const dynamic = "force-dynamic";
import Companies from "@/components/pageSection/companies/Companies";
import DeleteAll from "@/components/shared/DeleteAll";
import { BASE_URL } from "@/libs/baseUrl";
import { CACHING_TIME } from "@/libs/cacheTime";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const CompanyPage = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    next: { revalidate: CACHING_TIME, tags: ["company"] },
  });

  return (
    <div>
      <Companies allCompanies={allCompanies} />

      {allCompanies?.length > 0 && (
        <DeleteAll
          endpoint="/api/company/resetall"
          title="Reset All Companies"
          tag="company"
        />
      )}
    </div>
  );
};

export default CompanyPage;

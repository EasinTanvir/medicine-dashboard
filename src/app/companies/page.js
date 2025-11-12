import Companies from "@/components/pageSection/companies/Companies";
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
    </div>
  );
};

export default CompanyPage;

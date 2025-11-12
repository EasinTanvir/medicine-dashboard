import Companies from "@/components/pageSection/companies/Companies";
import { BASE_URL } from "@/libs/baseUrl";
import { fetchData } from "@/libs/fetchHelper";
import React from "react";

const CompanyPage = async () => {
  const allCompanies = await fetchData(`${BASE_URL}/api/company`, {
    cache: "force-cache",
    next: { tags: ["company"] },
  });

  return (
    <div>
      <Companies allCompanies={allCompanies} />
    </div>
  );
};

export default CompanyPage;

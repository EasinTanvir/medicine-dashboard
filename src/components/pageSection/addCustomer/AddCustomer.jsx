import React from "react";
import AddCustomerForm from "./AddCustomerForm/AddCustomerForm";

const AddCustomer = ({ allCompanies }) => {
  return (
    <div>
      <AddCustomerForm allCompanies={allCompanies} />
    </div>
  );
};

export default AddCustomer;

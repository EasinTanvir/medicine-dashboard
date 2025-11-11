"use client";
import React, { useContext, useState, createContext } from "react";

const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const sendData = {
    openSidebar,
    setOpenSidebar,
  };

  return (
    <DashboardContext.Provider value={sendData}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (context === null) {
    throw new Error("someting went wrong in global context");
  }

  return context;
};

export default DashboardContextProvider;

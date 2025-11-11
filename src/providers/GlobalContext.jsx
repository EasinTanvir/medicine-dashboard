"use client";
import React, { useContext, useState } from "react";

const GlobalContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);
  const [listView, setListView] = useState(false);
  const [profileCoverOpen, setProfileCoverOpen] = useState(true);
  const sendData = {
    openNav,
    setOpenNav,
    listView,
    setListView,
    profileCoverOpen,
    setProfileCoverOpen,
  };

  return (
    <GlobalContext.Provider value={sendData}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === null) {
    throw new Error("someting went wrong in global context");
  }

  return context;
};

export default ContextProvider;

"use client";
import React from "react";

import DashBoardSideBar from "./sidebar/DashBoardSideBar";
import { useDashboardContext } from "@/providers/DashboardContextProvider";

const DashBoardSideBarWrapper = ({ children }) => {
  const { openSidebar } = useDashboardContext();

  return (
    <div>
      <DashBoardSideBar />
      <div
        className={`transition-all duration-200 ${
          openSidebar ? "pl-[70px]" : "lg:pl-[258px] pl-[72px]"
        } `}
      >
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default DashBoardSideBarWrapper;

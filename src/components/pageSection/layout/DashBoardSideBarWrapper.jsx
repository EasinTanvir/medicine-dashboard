"use client";
import React from "react";

import DashBoardSideBar from "./sidebar/DashBoardSideBar";
import DashboardNavbar from "./DashboardNavbar";
import { useDashboardContext } from "@/providers/DashboardContextProvider";

const DashBoardSideBarWrapper = ({ children }) => {
  const { openSidebar } = useDashboardContext();

  return (
    <div>
      {/* navbar */}
      <DashboardNavbar />
      {/* sidebar */}
      <DashBoardSideBar />
      {/* page content */}
      <div
        className={`bg-dashboard-background-bg transition-all duration-200  sm:py-[68px] py-[66px]  min-h-screen ${
          openSidebar ? "pl-[70px]" : "lg:pl-[298px] pl-[72px]"
        } pt-20`}
      >
        <div className="min-h-[64vh]">{children}</div>
      </div>
    </div>
  );
};

export default DashBoardSideBarWrapper;

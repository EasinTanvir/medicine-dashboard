"use client";

import React, { useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { Button } from "@/components/ui/Button";
import { inter } from "@/libs/fonts";
import { useDashboardContext } from "@/providers/DashboardContextProvider";
import { motion } from "framer-motion";

import {
  MdDashboard,
  MdOutlinePostAdd,
  MdManageAccounts,
  MdReportGmailerrorred,
  MdAdsClick,
  MdOutlineEditNote,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const DashBoardSideBar = () => {
  const sidebarItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/",
      icon: <MdDashboard className="w-6 h-6" />,
    },
    {
      key: "editor",
      label: "Editor",
      href: "/dashboard/editor",
      icon: <MdOutlineEditNote className="w-6 h-6" />,
    },
    {
      key: "admin-post",
      label: "Admin Post",
      href: "/dashboard/admin-post",
      icon: <MdOutlinePostAdd className="w-6 h-6" />,
    },
    {
      key: "manage-role",
      label: "Manage Role",
      href: "/dashboard/manage-role",
      icon: <MdManageAccounts className="w-6 h-6" />,
    },
    {
      key: "reports",
      label: "Reports",
      href: "/dashboard/reports",
      icon: <MdReportGmailerrorred className="w-6 h-6" />,
    },
    {
      key: "ads-manager",
      label: "Ads-Manager",
      href: "/dashboard/ads-manager",
      icon: <MdAdsClick className="w-6 h-6" />,
    },
  ];

  const { openSidebar, setOpenSidebar } = useDashboardContext();

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpenSidebar]);

  return (
    <motion.div
      initial={false}
      animate={{ width: openSidebar ? "4rem" : "17rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-black z-40 shadow-dashboard-sidebar ${
        openSidebar ? "px-2" : "sm:px-3.5 px-2"
      } sm:pt-[85px] pt-[75px] pb-20 scrollbar-hide rounded-t-sm rounded-b-sm min-h-screen max-h-screen overflow-y-auto fixed top-0 left-0 overflow-hidden`}
    >
      <div className="space-y-3 ">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        ))}
      </div>

      <Button
        onClick={() => setOpenSidebar(!openSidebar)}
        className={`bg-dashboard-sidebar-inactive-bg border border-[#cdb920] rounded-sm flex items-center mt-14 w-full 
          ${openSidebar ? "justify-center py-3" : "justify-start px-4 py-5"} 
          ${inter.className}`}
      >
        <MdKeyboardDoubleArrowLeft
          className={`w-6 h-6 transition-transform duration-300 ${
            openSidebar ? "rotate-180" : "rotate-0"
          }`}
        />
        <motion.span
          animate={{
            opacity: openSidebar ? 0 : 1,
            width: openSidebar ? 0 : "auto",
            marginLeft: openSidebar ? 0 : 12,
          }}
          transition={{ duration: 0.25 }}
          className="dashboard-sidebar-text text-xl font-900 whitespace-nowrap overflow-hidden"
        >
          Collapse
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default DashBoardSideBar;

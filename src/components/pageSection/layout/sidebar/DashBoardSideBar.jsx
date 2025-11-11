"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { Button } from "@/components/ui/Button";
import { inter } from "@/libs/fonts";

import { useDashboardContext } from "@/providers/DashboardContextProvider";
import { motion } from "framer-motion";

const DashBoardSideBar = () => {
  let adminpost;
  let adsmanager;
  let back;
  let dashboard;
  let editor;
  let report;
  let role;

  const sidebarItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: dashboard,
    },
    { key: "editor", label: "Editor", href: "/dashboard/editor", icon: editor },
    {
      key: "admin-post",
      label: "Admin Post",
      href: "/dashboard/admin-post",
      icon: adminpost,
    },
    {
      key: "manage-role",
      label: "Manage Role",
      href: "/dashboard/manage-role",
      icon: role,
    },
    {
      key: "reports",
      label: "Reports",
      href: "/dashboard/reports",
      icon: report,
    },
    {
      key: "ads-manager",
      label: "Ads-Manager",
      href: "/dashboard/ads-manager",
      icon: adsmanager,
    },
  ];

  const { openSidebar, setOpenSidebar } = useDashboardContext();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpenSidebar(true);
      } else {
        setOpenSidebar(false);
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpenSidebar]);
  return (
    <motion.div
      initial={false}
      animate={{ width: openSidebar ? "4rem" : "17rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-dashboard-sidebar-bg z-40   shadow-dashboard-sidebar ${
        openSidebar ? "px-2" : "sm:px-3.5 px-2"
      }  sm:pt-[85px] pt-[75px] pb-20  scrollbar-hide rounded-t-sm rounded-b-sm min-h-screen max-h-screen overflow-y-auto fixed top-0  left-0  overflow-hidden`}
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
        <Image
          src={back}
          alt="collapse"
          className={`w-5 h-5 object-contain transition-transform duration-300 ${
            openSidebar ? "rotate-180" : "rotate-0"
          }`}
        />

        {/* Always rendered, just animate opacity/width */}
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

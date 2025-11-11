"use client";

import React, { useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { Button } from "@/components/ui/Button";
import { inter } from "@/libs/fonts";
import { useDashboardContext } from "@/providers/DashboardContextProvider";
import { motion } from "framer-motion";
import { MdKeyboardDoubleArrowLeft, MdLocalPharmacy } from "react-icons/md";
import { sidebarItems } from "@/libs/sidebarLinks";

const DashBoardSideBar = () => {
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
      animate={{ width: openSidebar ? "4rem" : "15rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-black text-white z-40 shadow-lg ${
        openSidebar ? "px-2" : "sm:px-3.5 px-2"
      } py-10 scrollbar-hide rounded-t-sm rounded-b-sm min-h-screen max-h-screen overflow-y-auto fixed top-0 left-0 overflow-hidden`}
    >
      {/* ✅ Brand Section */}
      <div
        className={`flex items-center justify-center mb-8 transition-all duration-300 ${
          openSidebar ? "flex-col gap-2" : "gap-3 px-3"
        }`}
      >
        <MdLocalPharmacy className="text-green-400 w-8 h-8" />
        {!openSidebar && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold tracking-wide"
          >
            Pharmacy
          </motion.h1>
        )}
      </div>

      {/* ✅ Sidebar Items */}
      <div className="space-y-3">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        ))}
      </div>

      {/* ✅ Collapse Button */}
      <Button
        onClick={() => setOpenSidebar(!openSidebar)}
        className={`bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-sm flex items-center mt-14 w-full 
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
          className="text-base font-900 whitespace-nowrap overflow-hidden"
        >
          Collapse
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default DashBoardSideBar;

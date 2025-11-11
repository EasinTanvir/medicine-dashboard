"use client";

import { inter } from "@/libs/fonts";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, openSidebar, setOpenSidebar }) => {
  const pathname = usePathname();

  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard" // exact match only for main dashboard
      : pathname.startsWith(item.href); // prefix match for others
  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setOpenSidebar(true); // close on small screen
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={item.href}
      className={`flex items-center transition-colors duration-200 overflow-hidden
        ${openSidebar ? "justify-center px-2 " : "gap-4 px-4 "} py-5 w-full
        ${
          isActive
            ? "dashboard-sidebar-active-text-border"
            : "bg-dashboard-sidebar-inactive-bg dashboard-sidebar-inactive-border"
        }
        ${inter.className}`}
    >
      {/* <Image
        src={item.icon}
        alt={item.label}
        className={`object-contain ${openSidebar ? "w-6 h-6" : "w-5 h-5"}`}
      /> */}

      {/* Always render text, animate opacity + width */}
      <motion.span
        animate={{
          opacity: openSidebar ? 0 : 1,
          width: openSidebar ? 0 : "auto",
          marginLeft: openSidebar ? 0 : 8,
        }}
        transition={{ duration: 0.1 }}
        className={`dashboard-sidebar-text text-xl font-[900] whitespace-nowrap overflow-hidden ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {item.label}
      </motion.span>
    </Link>
  );
};

export default SidebarItem;

"use client";

import { inter } from "@/libs/fonts";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, openSidebar, setOpenSidebar }) => {
  const pathname = usePathname();

  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href);

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setOpenSidebar(true);
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={item.href}
      className={`flex items-center transition-colors duration-200 overflow-hidden
        ${openSidebar ? "justify-center px-2" : "gap-4 px-4"} py-5 w-full
        ${
          isActive
            ? "dashboard-sidebar-active-text-border"
            : "bg-dashboard-sidebar-inactive-bg dashboard-sidebar-inactive-border"
        }
        ${inter.className}`}
    >
      {/* ✅ Replace Image with icon */}
      <div
        className={`${
          openSidebar ? "w-6 h-6" : "w-5 h-5"
        } flex-shrink-0 text-white`}
      >
        {item.icon}
      </div>

      {/* ✅ Sidebar label animation remains the same */}
      <motion.span
        animate={{
          opacity: openSidebar ? 0 : 1,
          width: openSidebar ? 0 : "auto",
          marginLeft: openSidebar ? 0 : 8,
        }}
        transition={{ duration: 0.1 }}
        className={`dashboard-sidebar-text text-xl font-900 whitespace-nowrap overflow-hidden ${
          isActive ? "text-white" : "text-gray-200"
        }`}
      >
        {item.label}
      </motion.span>
    </Link>
  );
};

export default SidebarItem;

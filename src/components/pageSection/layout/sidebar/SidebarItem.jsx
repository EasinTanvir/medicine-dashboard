"use client";

import { inter } from "@/libs/fonts";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, openSidebar, setOpenSidebar }) => {
  const pathname = usePathname();

  // ✅ Fixed logic:
  const isActive =
    item.href === "/"
      ? pathname === "/" // exact match only for dashboard root
      : pathname.startsWith(item.href); // prefix match for others

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      setOpenSidebar(true);
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={item.href}
      className={`flex items-center transition-all duration-200 overflow-hidden rounded-md
        ${openSidebar ? "justify-center px-2" : "gap-4 px-4"} py-4 w-full
        ${
          isActive
            ? "bg-white text-black"
            : "bg-transparent hover:bg-gray-800 text-gray-300"
        }
        ${inter.className}`}
    >
      <div
        className={`${openSidebar ? "w-6 h-6" : "w-5 h-5"} shrink-0 ${
          isActive ? "text-black" : "text-white"
        }`}
      >
        {item.icon}
      </div>

      <motion.span
        animate={{
          opacity: openSidebar ? 0 : 1,
          width: openSidebar ? 0 : "auto",
          marginLeft: openSidebar ? 0 : 8,
        }}
        transition={{ duration: 0.1 }}
        className={`text-base font-semibold whitespace-nowrap overflow-hidden`}
      >
        {item.label}
      </motion.span>
    </Link>
  );
};

export default SidebarItem;

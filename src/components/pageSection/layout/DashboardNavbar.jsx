import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { medievalSharp, monda } from "@/libs/fonts";
import AdminDropdown from "./AdminDropdown";

const DashboardNavbar = () => {
  return (
    <div className="md:pr-2 z-50  fixed top-0 left-0 w-full  dashboard-nav-full-bg shadow-dashboard-navbar flex justify-between items-center">
      <Left />
      <Right />
    </div>
  );
};

export default DashboardNavbar;

const Left = () => {
  return (
    <div className=" md:ps-5  md:pe-3 md:py-2 py-3 md:w-68 w-fit  px-4 flex items-center gap-3 bg-nav-side-effect-bg   shadow-nav-side-effect-shadow rounded-tr-3xl rounded-br-4xl">
      {/* <BrandLogo admin /> */}
      <div className="w-36 h-11 relative md:flex justify-center items-center hidden">
        {/* <Image className="z-0" fill src={navshape} alt="navshape" /> */}
        <div className="z-10 flex flex-col ">
          <p
            className={`${medievalSharp.className} text-sm  text-dashboard-admin-text`}
          >
            <span className="dashboard-admin-text-shadow "> ADMIN</span>
          </p>
          <p
            className={`${monda.className} text-[8px] text-center -mt-2 text-dashboard-admin-text`}
          >
            <span className="dashboard-version-text-shadow">Version 0.1</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Right = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="bg-dashboard-user-popup py-2 px-3 rounded-md cursor-pointer"
      >
        <div className="bg-dashboard-user-wrapper-popup flex items-center gap-3 px-2 rounded-md">
          {/* <div className="w-8 h-8 rounded-full relative">
            <Image src={adminuser} fill alt="adminuser" />
          </div> */}

          {/* <motion.img
            src={dasharrowdown.src}
            alt="arrowdown"
            className="object-cover w-6"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          /> */}
        </div>
      </div>

      <AdminDropdown open={open} />
    </div>
  );
};

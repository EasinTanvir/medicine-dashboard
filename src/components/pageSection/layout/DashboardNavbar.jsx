import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { medievalSharp, monda } from "@/libs/fonts";
import AdminDropdown from "./AdminDropdown";

const DashboardNavbar = () => {
  return (
    <div className="md:pr-2 z-30  border-2 py-10 fixed top-0 left-0 w-full  bg-black flex justify-between items-center"></div>
  );
};

export default DashboardNavbar;

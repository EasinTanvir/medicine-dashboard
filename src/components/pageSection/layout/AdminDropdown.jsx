import { Button } from "@/components/ui/Button";

import { baloo_chettan_2, inter } from "@/libs/fonts";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminDropdown = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-13 right-0  bg-dashboard-dropdown-gradient  w-56 z-50      ${inter.className}`}
        >
          <div className="dashboard-dropdown-border-gradient-color px-2  py-3   flex flex-col   gap-y-4 ">
            <div
              href="/profile"
              className="  w-full px-1.5  bg-dashboard-dropdown-name-bg rounded-[9px] flex items-center justify-between gap-2 "
            >
              <div className="w-7 relative rounded-full aspect-square border-2">
                {/* <Image
                  className="object-contain"
                  src={adminuser}
                  alt="adminuser"
                  fill
                /> */}
              </div>
              <span className={` font-[900] text-lg text-textColor`}>
                Easin Tanvir
              </span>
              {/* <Image
                className="object-contain w-5"
                src={darrowup}
                alt="adminuser"
                width={100}
                height={100}
              /> */}
            </div>
            <div className="flex flex-col gap-3 ps-1.5">
              <Link
                className={` font-[900] text-lg text-textColor dashboard-dropdown-item-border-color  pb-2`}
                href="#"
              >
                Profile
              </Link>
              <Link
                className={` font-[900] text-lg text-textColor dashboard-dropdown-item-border-color  pb-2 `}
                href="#"
              >
                Settings
              </Link>
              <Link
                className={` font-[900] text-lg text-textColor dashboard-dropdown-item-border-color pb-2 `}
                href="#"
              >
                Go to web
              </Link>
            </div>
            <Button
              className={`dashboard-logout-text-color text-end border font-bold ${baloo_chettan_2.className}`}
            >
              LOGOUT
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminDropdown;

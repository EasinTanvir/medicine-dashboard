import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { dsearchicon } from "@/constant";
import { inter, stix_two_text } from "@/libs/fonts";
import Image from "next/image";
import React from "react";

const DashboardPostButtons = () => {
  return (
    <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col gap-4">
      <div
        className={`bg-white-color sm:px-2 px-0.5 flex  sm:gap-2 gap-0.5 justify-between  ${stix_two_text.className}`}
      >
        <Button className="bg-dashboard-editor-layout-buttns-bg rounded-sm sm:px-3.5 px-2 sm:py-2 py-1  border-b">
          <span className=" font-bold sm:text-sm text-xs text-dashboard-editor-all-posts-color">
            All Posts
          </span>
        </Button>
        <Button className="bg-dashboard-editor-layout-buttns-bg rounded-sm sm:px-3.5 px-2 sm:py-2 py-1">
          <span className=" font-bold text-sm text-dashboard-editor-recent-post-color">
            Recent Posts
          </span>
        </Button>
        <Button className="bg-dashboard-editor-layout-buttns-bg rounded-sm sm:px-3.5 px-2 sm:py-2 py-1">
          <span className=" font-bold text-sm text-dashboard-editor-recent-post-color">
            High Interactions
          </span>
        </Button>
      </div>
      <Button className=" bg-dashboard-sidebar-active-bg rounded-sm px-3 py-1 lg:-mt-10 ">
        <span
          className={` font-semibold text-sm text-textColor shippori-mincho-b1-semibold `}
        >
          Active Posts
        </span>
      </Button>
      <div className="border border-dashboard-editor-post-border-color xl:w-72 px-2 py-1 relative rounded-sm">
        <Input
          placeholder="Search Specific Post"
          className={`  text-dashboard-editor-post-text-color outline-none ${stix_two_text.className}`}
        />

        <Image
          className="absolute right-1 top-0 bottom-0 my-auto w-5 "
          src={dsearchicon}
          alt="searchIcon"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default DashboardPostButtons;

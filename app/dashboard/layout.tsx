import LeftSideBar from "@/components/dashboard/LeftSideBar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex">
        <LeftSideBar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;

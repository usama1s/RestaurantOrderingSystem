import React from "react";
import { ManagerSidebar } from "./managerSidebar";
export function ManagerLayout({ children }) {
  return (
    <div className="flex">
      <ManagerSidebar />
      {children}
    </div>
  );
}

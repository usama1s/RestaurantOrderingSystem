import React from "react";
import { ManagerHeader } from "./managerHeader";
import { useCtx } from "../../../context/Ctx";
//components
import { ManagerOrder } from "./orders";
import { ManagerDashboard } from "./dashboard";
export function ManagerContent() {
  const { activeTab, managerSidebarLinks } = useCtx();
  const renderManagerContent = (slug) => {
    switch (slug) {
      case "Dashboard":
        return <ManagerDashboard />;
      case "Items":
        return <h1>Items</h1>;
      case "Tables":
        return <h1>Tables</h1>;
      case "Orders":
        return <ManagerOrder />;
      case "Categories":
        return <h1>Categories</h1>;
      case "Products":
        return <h1>Products</h1>;
    }
  };

  return (
    <div className={"w-full px-4 lg:px-6 overflow-x-hidden"}>
      <ManagerHeader />
      {renderManagerContent(activeTab)}
    </div>
  );
}

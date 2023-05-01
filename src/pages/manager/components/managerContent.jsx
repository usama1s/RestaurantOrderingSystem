import React from "react";
import { ManagerHeader } from "./managerHeader";
import { useCtx } from "../../../context/Ctx";
export function ManagerContent() {
  const { activeTab, managerSidebarLinks } = useCtx();
  const renderManagerContent = (slug) => {
    switch (slug) {
      case "Dashboard":
        return <h1>Dashboard</h1>;
      case "Items":
        return <h1>Items</h1>;
      case "Tables":
        return <h1>Tables</h1>;
      case "Orders":
        return <h1>Orders</h1>;
      case "Categories":
        return <h1>Categories</h1>;
      case "Products":
        return <h1>Products</h1>;
    }
  };
  return (
    <div className="w-full">
      <ManagerHeader />
      {renderManagerContent(activeTab)}
    </div>
  );
}

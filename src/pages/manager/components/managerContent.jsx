import React from "react";
import { ManagerHeader } from "./managerHeader";
import { useCtx } from "../../../context/Ctx";
//components
import { ManagerOrder } from "./orders";
import { ManagerDashboard } from "./dashboard";
import { ManagerCategory } from "./categories";
import { Modal } from "../../../components/modal";
import { ManagerItems } from "./items";
export function ManagerContent() {
  const { activeTab, managerSidebarLinks, modalStatus } = useCtx();

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
        return <ManagerCategory />;
      case "Products":
        return <ManagerItems />;
    }
  };

  return (
    <div className={"w-full px-4 lg:px-6 overflow-x-hidden"}>
      <ManagerHeader />
      {renderManagerContent(activeTab)}
      {modalStatus.status && <Modal />}
    </div>
  );
}

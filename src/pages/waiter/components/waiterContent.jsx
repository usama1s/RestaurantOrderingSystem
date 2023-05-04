import React from "react";
import { useCtx } from "../../../context/Ctx";
import { Modal } from "../../../components/modal";
import { WaiterHeader } from "./waiterHeader";
import { TakeAway } from "./takeaway/index.jsx";

export function WaiterContent() {
  const { activeWaiterTab, waiterSidebarLinks, modalStatus } = useCtx();
  const renderWaiterContent = (slug) => {
    switch (slug) {
      case "Dine in":
        return <h1>dine in</h1>;
      case "Take away":
        return <TakeAway />;
      default:
        <h1>Abc</h1>;
    }
  };
  return (
    <div className={"w-full px-4 lg:px-6 overflow-x-hidden"}>
      <WaiterHeader />
      {renderWaiterContent(activeWaiterTab)}
      {modalStatus.status && <Modal />}
    </div>
  );
}

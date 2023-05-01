import React from "react";
import { Layout } from "../../components/reusables/layout";
import { AdminFoodlistings } from "./components/admin-foodlistings-list";
import { useCtx } from "../../context/Ctx";
import { Modal } from "../../components/reusables/modal";
import { AdminCategoryListings } from "./components/admin-categories-listings";

export function Admin() {
  const value = useCtx();
  const { modalStatus } = value;
  const renderChildren = (activeTab) => {
    switch (activeTab) {
      case "Categories":
        return <AdminCategoryListings />;
      case "Menu Items":
        return <AdminFoodlistings />;
      default:
        return "";
    }
  };
  return (
    <Layout>
      {renderChildren(value.activeTab)}
      {modalStatus.status && <Modal />}
    </Layout>
  );
}

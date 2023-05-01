import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/@firebase";
import { onAuthStateChanged } from "firebase/auth";
import { RiDashboardFill } from "react-icons/ri";
const Ctx = createContext();
export function CtxProvider({ children }) {
  const [modalStatus, setModalStatus] = useState({ status: false, jsx: null });
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [managerSidebarToggle, setManagerSidebarToggle] = useState(false);
  console.log(managerSidebarToggle);
  const [managerSidebarLinks, setManagerSidebarLinks] = useState([
    {
      title: "Dashboard",
      active: true,
    },
    {
      title: "Orders",
      active: false,
    },
    {
      title: "Tables",
      active: false,
    },
    {
      title: "Categories",
      active: false,
    },
    {
      title: "Products",
      active: false,
    },
  ]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [editedCategoryValue, setEditCategoryValue] = useState(null);
  const [editedItemValue, setEditedItemValue] = useState(null);
  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };
  const updateModalStatus = (status, jsx) => {
    setModalStatus({ ...status, jsx, status });
  };
  const updateCategoryValue = (value) => {
    setEditCategoryValue(value);
  };
  const updateItemValue = (value) => {
    setEditedItemValue(value);
  };
  const updateManagerSidebarLinks = (title) => () => {
    setManagerSidebarLinks(
      managerSidebarLinks.map((link) =>
        link.title === title
          ? { ...link, active: true }
          : { ...link, active: false }
      )
    );
    updateActiveTab(title);
  };
  const updateManagerSidebarToggle = (value) => () =>
    setManagerSidebarToggle(value);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setAuthenticatedUser(authUser);
      setAuthStatus(true);
      unsubscribe();
    });
  }, []);
  return (
    <Ctx.Provider
      value={{
        activeTab,
        updateActiveTab,
        modalStatus,
        updateModalStatus,
        authenticatedUser,
        setAuthenticatedUser,
        authStatus,
        editedCategoryValue,
        updateCategoryValue,
        updateItemValue,
        editedItemValue,
        managerSidebarLinks,
        managerSidebarToggle,
        updateManagerSidebarToggle,
        updateManagerSidebarLinks,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useCtx() {
  return useContext(Ctx);
}

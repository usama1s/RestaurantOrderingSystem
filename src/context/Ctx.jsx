import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/@firebase";
import { onAuthStateChanged } from "firebase/auth";
const Ctx = createContext();
export function CtxProvider({ children }) {
  const [modalStatus, setModalStatus] = useState({ status: false, jsx: null });
  const [activeTab, setActiveTab] = useState("Categories");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };
  const updateModalStatus = (status, jsx) => {
    setModalStatus({ ...status, jsx, status });
  };
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
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export function useCtx() {
  return useContext(Ctx);
}

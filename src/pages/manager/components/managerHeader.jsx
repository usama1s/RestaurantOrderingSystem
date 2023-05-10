import React from "react";
import { useMediaQuery } from "react-responsive";
import { useCtx, LOCAL_STORAGE_BASE } from "../../../context/Ctx";
import { ROUTES } from "../../../utils/routes";
import { signOut } from "@firebase/auth";
import { auth } from "../../../config/@firebase";
import { useNavigate } from "react-router";
export function ManagerHeader() {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: `(max-width:786px)` });
  const {
    managerSidebarToggle,
    updateManagerSidebarToggle,
    setAuthenticatedUser,
  } = useCtx();
  const logout = async () => {
    try {
      await signOut(auth);
      setAuthenticatedUser(null);
      localStorage.removeItem(`${LOCAL_STORAGE_BASE}Data`);
      navigate(ROUTES.login_manager);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="px-2 lg:px-6 flex items-center justify-between md:justify-end min-h-[10vh] w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 block md:hidden"
        onClick={updateManagerSidebarToggle(!managerSidebarToggle)}
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
      <button
        className="bg-black text-white py-2 px-6 rounded-md font-bold"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

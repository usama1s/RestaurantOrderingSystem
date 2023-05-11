import React from "react";
import { useMediaQuery } from "react-responsive";
import { BsCartFill } from "react-icons/bs";
import { useCartCtx } from "../../../context/CartCtx";
import { auth } from "../../../config/@firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ROUTES } from "../../../utils/routes";
import { useCtx, LOCAL_STORAGE_BASE } from "../../../context/Ctx";
export function WaiterHeader() {
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ query: `(max-width:786px)` });
  const {
    managerSidebarToggle,
    updateManagerSidebarToggle,
    setAuthenticatedUser,
  } = useCtx();
  const { updateCartStatus, cartNoOfItems } = useCartCtx();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate(ROUTES.login_waiter);
      setAuthenticatedUser(null);
      localStorage.removeItem(`${LOCAL_STORAGE_BASE}Data`);
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
      <div className={`relative justify-end flex space-x-2 items-center`}>
        <div>
          <BsCartFill
            className="cursor-pointer w-6 h-6"
            size={16}
            onClick={() => updateCartStatus(true)}
          />
          {cartNoOfItems >= 1 && (
            <span
              className={`absolute -top-3 -right-3 bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center`}
            >
              {cartNoOfItems}
            </span>
          )}
        </div>
        <button
          className="bg-black text-white py-2 px-6 rounded-md font-bold"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

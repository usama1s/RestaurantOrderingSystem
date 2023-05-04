import React from "react";
import { useMediaQuery } from "react-responsive";
import { useCtx } from "../../../context/Ctx";
import { BsCartFill } from "react-icons/bs";
import { useCartCtx } from "../../../context/CartCtx";
export function ManagerHeader() {
  const isTablet = useMediaQuery({ query: `(max-width:786px)` });
  const { managerSidebarToggle, updateManagerSidebarToggle } = useCtx();
  const { updateCartStatus } = useCartCtx();
  // React.useEffect(() => {
  //   if (!isTablet) {
  //     updateManagerSidebarToggle(true);
  //   }
  // }, [isTablet]);
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
      {/* <div className={`relative justify-end`}>
        <BsCartFill
          className="cursor-pointer"
          size={16}
          onClick={() => updateCartStatus(true)}
        />
        <span
          className={`absolute -top-3 -right-3 bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center`}
        >
          3
        </span>
      </div> */}
    </div>
  );
}

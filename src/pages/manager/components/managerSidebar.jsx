import React from "react";
import { useMediaQuery } from "react-responsive";
import { useCtx } from "../../../context/Ctx";
import { MdRestaurantMenu } from "react-icons/md";
//
export function ManagerSidebar() {
  const isTablet = useMediaQuery({ query: `(max-width:786px)` });
  const {
    managerSidebarLinks,
    updateManagerSidebarLinks,
    managerSidebarToggle,
  } = useCtx();

  const JSX = managerSidebarLinks.map(({ title, active }) => (
    <div
      className={`flex items-center w-full h-12 px-3 mt-2 ${
        active && "bg-gray-300"
      }  rounded`}
      onClick={updateManagerSidebarLinks(title)}
    >
      <span class="ml-0 md:ml-2 text-xs md:text-sm font-medium">{title}</span>
    </div>
  ));
  return (
    <div
      className={`flex flex-col items-center   ${
        isTablet && managerSidebarToggle
          ? "-translate-x-[100%] w-0"
          : "translate-x-0  w-48"
      }    h-[100vh] overflow-hidden text-gray-700 bg-gray-100  rounded transition-all duration-75 ease-in`}
    >
      <div className="flex items-center w-full px-3 mt-3">
        <MdRestaurantMenu size={24} />
        <span className="ml-2 text-xs md:text-sm font-bold">India Gate</span>
      </div>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
          {JSX}
        </div>
      </div>
    </div>
  );
}

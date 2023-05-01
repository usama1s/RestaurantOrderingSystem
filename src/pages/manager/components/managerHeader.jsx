import React from "react";
import { useMediaQuery } from "react-responsive";
import { useCtx } from "../../../context/Ctx";
export function ManagerHeader() {
  const isTablet = useMediaQuery({ query: `(max-width:786px)` });
  const { managerSidebarToggle, updateManagerSidebarToggle } = useCtx();
  React.useEffect(() => {
    if (!isTablet) {
      updateManagerSidebarToggle(true);
    }
  }, [isTablet]);
  return (
    <div className="px-2 flex items-center justify-between min-h-[10vh] w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
        onClick={updateManagerSidebarToggle(!managerSidebarToggle)}
      >
        <path
          fill-rule="evenodd"
          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  );
}

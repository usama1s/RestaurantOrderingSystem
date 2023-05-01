import React from "react";
import { useMediaQuery } from "react-responsive";
import { useCtx } from "../../../context/Ctx";
export function ManagerSidebar() {
  const isTablet = useMediaQuery({ query: `(max-width:786px)` });
  const {} = useCtx();
  return (
    <div className="">
      <div
        className={`flex flex-col items-center ${
          isTablet ? "w-12" : "w-40"
        } h-[100vh] overflow-hidden text-gray-700 bg-gray-100 rounded`}
      >
        <a className="flex items-center w-full px-3 mt-3">
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          {/* <span className="ml-2 text-sm font-bold">The App</span> */}
        </a>
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
            <div className="flex items-center w-full h-12 px-3 mt-2 bg-gray-300 rounded">
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {/* <span class="ml-2 text-sm font-medium">Insights</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

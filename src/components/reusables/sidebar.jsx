import { useState } from "react";
import { useCtx } from "../../context/Ctx";
import { forwardRef } from "react";
export const SideBar = forwardRef(({ showNav }, ref) => {
  const { managerSidebarLinks, updateManagerSidebarLinks } = useCtx();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-gray-100 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src="" alt="company logo" />
        </picture>
      </div>

      <div className="flex flex-col">
        {managerSidebarLinks.map((link) => (
          <div
            key={link.title}
            onClick={updateManagerSidebarLinks(link.title)}
            className={`text-xl pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              link.active
                ? "text-white bg-indigo-600"
                : "bg-transparent text-black"
            }`}
          >
            <div>
              <p>{link.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

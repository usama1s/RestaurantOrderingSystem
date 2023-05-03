import React from "react";

export function ManagerOrderSlider({ data, updateSliderCategory }) {
  return (
    <div className="w-full flex overflow-x-scroll scrollbar-thin scrollbar-thumb-[#D1D5DB] scrollbar-track-">
      {data.categories?.map(({ title, slug, active }) => (
        <div
          key={slug}
          onClick={() => updateSliderCategory(title)}
          className={`
          capitalize
          cursor-pointer
          ${
            active ? "bg-black text-white" : "bg-[#F3F4F6] text-black"
          } rounded-full p-2 mr-2 my-2`}
        >
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
}

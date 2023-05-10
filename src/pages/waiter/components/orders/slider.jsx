import React from "react";

export function ManagerOrderSlider({ data, updateSliderCategory }) {
  return (
    <div className="w-full flex gap-4">
      {data.categories?.map(({ title, slug, active }) => (
        <div
          key={slug}
          onClick={() => updateSliderCategory(title)}
          className={`cursor-pointer
          ${
            active ? "bg-black text-white" : "bg-[#F3F4F6] text-black"
          } rounded-full w-5 h-5 p-5 flex items-center justify-center`}
        >
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
}

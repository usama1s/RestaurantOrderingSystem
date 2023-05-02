import React from "react";

export function ManagerOrderSlider({ TEST_SLIDER }) {
  return (
    <div className="w-full flex overflow-x-scroll scrollbar-thin scrollbar-thumb-[#D1D5DB] scrollbar-track-">
      {TEST_SLIDER.map(({ title, slug }) => (
        <div key={slug} className={`bg-[#F3F4F6] rounded-full p-2 mr-2 my-2`}>
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
}

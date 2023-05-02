import React from "react";

export function ManagerOrderCards({ TEST_CARDS }) {
  return (
    <div className={`grid grid-cols-fluid gap-2 overflow-x-hidden mt-4`}>
      {TEST_CARDS.map(({ title, price, category, imageURL, slug }) => (
        <div
          key={slug}
          className={`pb-0 my-2 relative border-[1px] border-[#F3F4F6] shadow-lg`}
        >
          <div>
            <img
              src={imageURL}
              alt={imageURL}
              className="w-full h-[40vh] object-cover rounded-md"
            />
          </div>
          <h1 className="p-2 truncate break-words text-xl text-center font-semibold">
            {title}
          </h1>
          <div className="h-[0.5px] w-full bg-[#F3F4F6]" />
          <h1 className="py- truncate break-words text-base text-center font-normal">
            Rs.{price}
          </h1>
          <button className="w-full flex items-center justify-center text-base mt-2 py-2 round-b-xl bg-[#D1D5DB] font-bold ">
            Add to Cart
          </button>
          <p className="absolute top-2 left-2 bg-gray-300 text-gray-900 p-2 rounded-full font-bold">
            {category}
          </p>
        </div>
      ))}
    </div>
  );
}

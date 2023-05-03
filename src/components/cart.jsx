import React from "react";
import { CartItems } from "./cartItems";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCartCtx } from "../context/CartCtx";
export function Cart({ title }) {
  const { updateCartStatus, cartStatus } = useCartCtx();
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("card-shadow")) {
          updateCartStatus(false);
        }
      }}
      className={`card-shadow z-[2] transition-all duration-75 ease-in-outs ${
        cartStatus
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed h-full top-0 right-0 w-full flex justify-end bg-[rgba(0,0,0,0.5)]`}
    >
      <div
        className={`bg-white w-[30vw] overflow-y-scroll scrollbar-track-[white] scrollbar-thumb-[#F3F4F6] scrollbar-thin px-2 transition-all duration-75 ease-in-outs ${
          !cartStatus ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between py-4">
          <h1 className="text-xl font-bold leading-2">{title}</h1>
          <XMarkIcon
            onClick={() => updateCartStatus(false)}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
        <div>
          <CartItems />
          <h1 className="font-normal text-xl py-4 flex pl-1 gap-x-2">
            <span className="font-bold">Total is:</span> 330
          </h1>
        </div>
      </div>
    </div>
  );
}

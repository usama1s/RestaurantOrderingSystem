import React from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCartCtx } from "../context/CartCtx";
export function Cart() {
  const { updateCartStatus, cartStatus } = useCartCtx();
  return (
    <div
      className={`z-[2] transition-all duration-75 ease-in-outs ${
        cartStatus
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed h-full top-0 right-0 w-full flex justify-end bg-[rgba(0,0,0,0.5)]`}
    >
      <div
        className={`bg-white w-[30vw] overflow-y-scroll scrollbar-thin px-2 transition-all duration-75 ease-in-outs ${
          !cartStatus ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between py-2">
          <h1>Cart</h1>
          <XMarkIcon
            onClick={() => updateCartStatus(false)}
            className="h-6 w-6"
          />
        </div>
      </div>
    </div>
  );
}

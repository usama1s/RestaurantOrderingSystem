import {
  PlusCircleIcon,
  MinusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useCartCtx } from "../context/CartCtx";
export function CartModal() {
  const [qty, setQty] = React.useState(0);
  const { updateCartModalStatus, updateCartStatus } = useCartCtx();
  const add = (value) => () => {
    if (qty <= 0) setQty(1);
    else {
      setQty((prevQty) => prevQty + value);
    }
  };
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("cart-modal-shadow"))
          return updateCartModalStatus(false);
      }}
      className="cart-modal-shadow bg-[rgba(0,0,0,0.5)] flex items-center justify-center fixed top-0 left-0 w-full h-full"
    >
      <div className="min-h-[20vh] rounded-md bg-white w-[70%] flex flex-col">
        <div className="flex items-center justify-end py-1 pr-1 self-auto">
          <XMarkIcon
            className="h-8 w-8"
            onClick={() => updateCartModalStatus(false)}
          />
        </div>
        <h2 className="text-2xl font-bold py-2 text-center">
          Item Selected: Biryani
        </h2>
        <div className="flex items-center py-2 gap-2 justify-center ">
          <MinusCircleIcon onClick={add(-1)} className="w-8 h-8" />
          <span>{qty}</span>
          <PlusCircleIcon onClick={add(+1)} className="w-8 h-8" />
        </div>
        <button
          onClick={() => {
            updateCartStatus(true);
          }}
          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 text-base font-semibold leading-7 text-white"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

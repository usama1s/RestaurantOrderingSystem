import {
  PlusCircleIcon,
  MinusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useCartCtx } from "../context/CartCtx";
export function CartModal() {
  const { updateCartModalStatus, onItemAdd, cartModalStatus, itemsOfCart } =
    useCartCtx();

  const [qty, setQty] = React.useState(1);
  const add = (value) => () => {
    if (qty + value <= 0) {
      setQty(1);
      return;
    }
    setQty((prev) => prev + value);
  };
  const addItemToCart = () => {
    const { title, price, slug } = cartModalStatus.value;

    onItemAdd({ title, price, slug, qty });
    updateCartModalStatus(false, null);
  };
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("cart-modal-shadow")) {
          updateCartModalStatus(false, null);
        }
      }}
      className="cart-modal-shadow bg-[rgba(0,0,0,0.5)] flex items-center justify-center fixed top-0 left-0 w-full h-full"
    >
      <div className="min-h-[20vh] rounded-md bg-white w-[70%] flex flex-col">
        <div className="flex items-center justify-end py-1 pr-1 self-auto">
          <XMarkIcon
            className="h-8 w-8"
            onClick={() => updateCartModalStatus(false, null)}
          />
        </div>
        <h2 className="text-2xl font-bold py-2 text-center">
          Item Selected: {cartModalStatus.value.title}
        </h2>
        <div className="flex items-center py-2 gap-2 justify-center ">
          <MinusCircleIcon onClick={add(-1)} className="w-8 h-8" />
          <span>{qty}</span>
          <PlusCircleIcon onClick={add(+1)} className="w-8 h-8" />
        </div>
        <button
          onClick={addItemToCart}
          className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 text-base font-semibold leading-7 text-white"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

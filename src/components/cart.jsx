import React from "react";
import { CartItems } from "./cartItems";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCartCtx } from "../context/CartCtx";
import { useCtx } from "../context/Ctx";
import { PlaceOrderTakeaway } from "../pages/waiter/components/takeaway/placeorder";
import { PlaceOrderDinein } from "../pages/waiter/components/dinein/placeorder";

export function Cart({ title }) {
  const { updateCartStatus, cartStatus, itemsOfCart, cartTotalPrice } =
    useCartCtx();
  const { updateModalStatus, activeWaiterTab } = useCtx();
  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains("card-shadow")) {
          updateCartStatus(false);
        }
      }}
      className={`card-shadow z-[1000] transition-all duration-75 ease-in-outs ${
        cartStatus
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed h-full top-0 right-0 w-full flex justify-end bg-[rgba(0,0,0,0.5)]`}
    >
      <div
        className={`bg-white w-[30vw] flex flex-col overflow-hidden px-2 transition-all duration-75 ease-in-outs ${
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
        <div className="h-[90vh] overflow-y-scroll">
          {itemsOfCart.length >= 1 ? (
            itemsOfCart.map((itemData) => (
              <CartItems key={itemData.slug} {...itemData} />
            ))
          ) : (
            <h1 className="font-bold text-black text-xl">
              No items in the cart right now.
            </h1>
          )}
        </div>
        <div className="flex items-center justify-between px-2">
          <h1 className="text-base font-regular">
            Total:
            <span className="text-black ml-1 font-bold">
              TRY {cartTotalPrice}
            </span>
          </h1>
          <button
            onClick={() =>
              updateModalStatus(
                true,
                activeWaiterTab === "Take away" ? (
                  <PlaceOrderTakeaway />
                ) : (
                  <PlaceOrderDinein />
                )
              )
            }
            disabled={itemsOfCart.length <= 0}
            className={`items-center justify-center rounded-md bg-black px-1.5 py-2.5 text-base font-semibold leading-7 text-white`}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

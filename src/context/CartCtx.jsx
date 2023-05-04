import { createContext, useContext, useEffect, useState } from "react";
const CartCtx = createContext();
export function CartCtxProvider({ children }) {
  //states and stuff
  const [cartStatus, setCartStatus] = useState(false);
  const [cartModalStatus, setCartModalStatus] = useState(false);
  console.log(cartModalStatus);
  useEffect(() => {
    if (cartStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartStatus]);
  //fns
  const updateCartStatus = (value) => setCartStatus(value);
  const updateCartModalStatus = (value) => setCartModalStatus(value);
  return (
    <CartCtx.Provider
      value={{
        cartStatus,
        updateCartStatus,
        cartModalStatus,
        updateCartModalStatus,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}
export function useCartCtx() {
  return useContext(CartCtx);
}

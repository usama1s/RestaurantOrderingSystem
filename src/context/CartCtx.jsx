import { createContext, useContext, useEffect, useState } from "react";
const CartCtx = createContext();
export function CartCtxProvider({ children }) {
  //states and stuff
  const [cartStatus, setCartStatus] = useState(false);
  useEffect(() => {
    if (cartStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartStatus]);
  //fns
  const updateCartStatus = (value) => setCartStatus(value);
  return (
    <CartCtx.Provider value={{ cartStatus, updateCartStatus }}>
      {children}
    </CartCtx.Provider>
  );
}
export function useCartCtx() {
  return useContext(CartCtx);
}

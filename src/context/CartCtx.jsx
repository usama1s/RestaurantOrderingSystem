import { createContext, useContext, useEffect, useState } from "react";
const CartCtx = createContext();
export function CartCtxProvider({ children }) {
  //states and stuff
  const [cartStatus, setCartStatus] = useState(false);
  const [cartModalStatus, setCartModalStatus] = useState({
    open: false,
    value: null,
  });
  const [itemsOfCart, setItemsOfCart] = useState([]);
  const cartNoOfItems = itemsOfCart.length;
  const cartTotalPrice =
    cartNoOfItems > 0
      ? itemsOfCart.reduce((accum, item) => {
          return accum + item.price * item.qty;
        }, 0)
      : 0;

  useEffect(() => {
    if (cartStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [cartStatus]);
  //fns
  //Calculations
  const onItemAdd = (data) => {
    const itemExists = itemsOfCart.find((d) => d.slug === data.slug);
    if (itemExists) {
      setItemsOfCart((prevItems) => {
        return prevItems.map((item) =>
          item.slug === data.slug
            ? { ...item, qty: data.qty + item.qty }
            : { ...item }
        );
      });
      return;
    }
    setItemsOfCart((prevItems) => [...prevItems, data]);
  };
  const onItemDelete = (slug) => {
    setItemsOfCart((prevItems) =>
      prevItems.filter((item) => item.slug !== slug)
    );
  };
  const onCartItemAdd = (data) => {
    setItemsOfCart((prevItems) =>
      prevItems.map((item) => {
        return item.slug === data.slug
          ? { ...item, qty: item.qty + 1 }
          : { ...item };
      })
    );
  };
  const onCartItemRemove = (data) => {
    const item = itemsOfCart.find((element) => element.slug === data.slug);
    if (item.qty - 1 === 0) {
      setItemsOfCart((prevItems) =>
        prevItems.filter((element) => element.slug !== data.slug)
      );
    } else {
      setItemsOfCart((prevItems) =>
        prevItems.map((item) => {
          return item.slug === data.slug
            ? { ...item, qty: item.qty - 1 }
            : { ...item };
        })
      );
    }
  };
  //
  const resetCart = () => {
    setItemsOfCart([]);
  };
  const updateCartStatus = (value) => setCartStatus(value);
  const updateCartModalStatus = (status, value) =>
    setCartModalStatus({ open: status, value });
  return (
    <CartCtx.Provider
      value={{
        cartStatus,
        updateCartStatus,
        cartModalStatus,
        updateCartModalStatus,
        onItemAdd,
        cartNoOfItems,
        itemsOfCart,
        onItemDelete,
        cartTotalPrice,
        onCartItemAdd,
        onCartItemRemove,
        resetCart,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}
export function useCartCtx() {
  return useContext(CartCtx);
}

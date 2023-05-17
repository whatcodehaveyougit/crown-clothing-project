import { useEffect } from "react";
import { createContext, useState, useReducer } from "react";

// The value I want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  // Find if cart contains product to add
  const productToAddInBasket = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If found increment quantity - return a brand new array
  if (productToAddInBasket) {
    // NB - Map without curleys.......
    return cartItems.map((cartItem) =>
      cartItem.id === productToAddInBasket.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // If the user has added a NEW item, the add this to array and return that.
  // Return new array of objects with original cart items + the new cart item (spread in with a default quantity of 1)
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToTakeOffOne) => {
  // Check if the quantity is equal to 1, if it is, then remove from basket.
  const updatedCartItems = cartItems.map((cartItem) =>
    cartItem.id === productToTakeOffOne.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  return updatedCartItems;
};

const clearCartItem = (cartItems, itemToClearFromCart) => {
  // NB: This removes the item COMPLETELY from the cart
  let updatedCartItems = [];
  cartItems.forEach((cartItem) => {
    if (cartItem.id != itemToClearFromCart.id) {
      updatedCartItems.push(cartItem);
    }
  });
  return updatedCartItems;
};

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type}`);
  }
};

const INITIAL_STATE = {
  cartTotal: 0,
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
};

export const CartProvider = ({ children }) => {
  const [{ cartTotal, isCartOpen, cartItems, cartCount }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (accumulator, currentElement) => accumulator + currentElement.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (accumulator, currentElement) =>
        accumulator + currentElement.price * currentElement.quantity,
      0
    );
    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartCount: newCartCount,
        cartTotal: newCartTotal,
        cartItems: newCartItems,
      },
    });
  };

  // This will be triggered every time the user clicks AddToCart
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (itemToClearFromCart) => {
    const newCartItems = clearCartItem(cartItems, itemToClearFromCart);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (productToTakeOffOne) => {
    const newCartItems = removeCartItem(cartItems, productToTakeOffOne);
    updateCartItemsReducer(newCartItems);
  };

  // ============ This is where things are actually added to the context ============= //
  const value = {
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    clearItemFromCart,
    addItemToCart,
    removeItemToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

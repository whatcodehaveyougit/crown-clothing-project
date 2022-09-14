import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // Find if cart carts contains product to add

    // If found increment quantity

    // Return new array with modified cart items / new cart items
}

// The value I want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: []
});

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState( false );
    const [ cartItems, setCartItems ] = useState([]);

    // This will be triggered every time the user clicks AddToCart
    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) )
    }


    const value = { isCartOpen, setIsCartOpen };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
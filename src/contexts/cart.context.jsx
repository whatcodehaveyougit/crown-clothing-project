import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

    // Find if cart carts contains product to add
    const productToAddInBasket = cartItems.find(( cartItem ) => cartItem.id == productToAdd.id )

    // If found increment quantity - return a brand new array
    if ( productToAddInBasket ) {
        return cartItems.map( (cartItem) => 
            cartItem.id === productToAddInBasket.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }

    // Return new array with modified cart items / new cart items
    return [ ...cartItems, {...productToAdd, quantity: 1 }]
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

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
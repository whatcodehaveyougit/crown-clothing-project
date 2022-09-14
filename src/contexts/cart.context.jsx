import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

    // Find if cart contains product to add
    const productToAddInBasket = cartItems.find(( cartItem ) => cartItem.id == productToAdd.id )

    // If found increment quantity - return a brand new array
    if ( productToAddInBasket ) {
        // NB - Map without curleys.......
        return cartItems.map( (cartItem) => 
            cartItem.id === productToAddInBasket.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }

    // Return new array of objects with original cart items + the new cart item (spread in with a default quantity of 1)
    return [ ...cartItems, {...productToAdd, quantity: 1 }]
}

// The value I want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: []
});

// Not exactly sure what the children does......
export const CartProvider = ({ children }) => {
    
    const [ isCartOpen, setIsCartOpen ] = useState( false );
    const [ cartItems, setCartItems ] = useState([]);

    // This will be triggered every time the user clicks AddToCart
    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) )
    }

    // ============ This is where things are actually added to the context ============= //
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
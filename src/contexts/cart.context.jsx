import { useEffect } from "react";
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

const removeCartItem = ( cartItems, productToTakeOffOne ) => {
    // Check if the quantity is equal to 1, if it is, then remove from basket. 
    const updatedCartItems =  cartItems.map( (cartItem) => 
        cartItem.id === productToTakeOffOne.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    )
    return updatedCartItems; 
}

const clearCartItem = ( cartItems, itemToClearFromCart ) => {
    let updatedCartItems = [];
    cartItems.forEach( (cartItem) => {
        if ( cartItem.id != itemToClearFromCart.id ) {
            updatedCartItems.push(cartItem);
        }
    })
    return updatedCartItems;
}

// The value I want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    // removeItemToCart: () => {},
    // addItemToCart: () => {},
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
});

// Not exactly sure what the children does......
export const CartProvider = ({ children }) => {
    
    const [ isCartOpen, setIsCartOpen ] = useState( false );
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    useEffect(() => {
        console.log('cart items changed')
        const totalQuantity  = cartItems.reduce( ( accumulator, currentElement ) => accumulator + currentElement.quantity , 0 )
        setCartCount( totalQuantity )
    }, [cartItems])

    // Single responsability UseEffects() - Good Practice
    useEffect(() => {
        const cartTotalPrice  = cartItems.reduce( ( accumulator, currentElement ) =>
        accumulator + currentElement.price * currentElement.quantity , 0 )
        setCartTotal( cartTotalPrice );
    }, [cartItems])

    // This will be triggered every time the user clicks AddToCart
    const addItemToCart = ( productToAdd ) => {
        setCartItems( addCartItem( cartItems, productToAdd ) )
    }

    const clearItemFromCart = ( itemToClearFromCart ) => {
        setCartItems( clearCartItem( cartItems, itemToClearFromCart ) )    
    } 

    const removeItemToCart = ( productToTakeOffOne ) => {
        setCartItems( removeCartItem( cartItems, productToTakeOffOne) )
    } 

    // ============ This is where things are actually added to the context ============= //
    const value = { 
        cartTotal, 
        cartCount, 
        isCartOpen, 
        setIsCartOpen, 
        cartItems,
        clearItemFromCart,
        addItemToCart,
        removeItemToCart
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
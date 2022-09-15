import { useContext } from 'react';
import { Link } from "react-router-dom";
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component'

import Button from '../button/button.componet'
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  console.log( 'cartItems' + cartItems );

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Link to="/checkout">
        <Button>Checkout</Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
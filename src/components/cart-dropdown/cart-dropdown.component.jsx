// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component'

import Button from '../button/button.componet'

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {/* {cartItems.length ? (
          cartItems.map((cartItem) => (
            // <CartItem key={cartItem.id} cartItem={cartItem} />
            <div></div>
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )} */}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
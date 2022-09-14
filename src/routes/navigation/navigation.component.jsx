import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.contexts';
import { signOutUser  } from '../../utils/firebase/firebase';
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import './navigation.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {

  // Whenever a value inside of this context updates, the functional component is re-rendered
  const { currentUser } = useContext( UserContext );
  const { isCartOpen } = useContext( CartContext );


  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {
          currentUser ? (
            <span className='nav-link' onClick={signOutUser}>Sign Out</span>
          ) : (
            <Link className='nav-link' to='/auth'>
               Sign in 
            </Link>
          )
          }
          <CartIcon />
        </div>
        { 
          isCartOpen && <CartDropdown /> 
        }
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

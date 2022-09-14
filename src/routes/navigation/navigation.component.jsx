import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.contexts';
import { signOutUser  } from '../../utils/firebase/firebase';
// import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () => {

  // Whenever a value inside of this context updates, the functional component is re-rendered
  const { currentUser } = useContext( UserContext );

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
        
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context.js'
import classes from './MainNavigation.module.css';
import { useState } from 'react/cjs/react.development';

const MainNavigation = () => {
  const UA = useContext(AuthContext);
  const isLoggedIn = UA.isLoggedIn;
  const logOutHandler = ()=> UA.logout();
  //console.log("Tok is "+isLoggedIn)
  return (
    
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Appiness</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn &&
          <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn &&
          <li>
            <Link to='/profile'>Update Profile</Link>
          </li>}
          {isLoggedIn &&
          <li>
            <Link to='/gallery'>Gallery</Link>
          </li>}
       
          {isLoggedIn &&
          <li>
            <button onClick={logOutHandler}>Logout</button>
          </li>
}
{isLoggedIn &&
          <li>
          <Link to='/chat'>Chat</Link>
        </li>}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

import React from 'react'
import { NavLink } from 'react-router-dom';
import AuthenticationService from '../api/hobby/AuthenticationService';


const Navbar = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

  return (

    <nav className="navbar">
      <ul className="nav-links">
        {isUserLoggedIn && <li className="nav-link"><NavLink to='/user-home'>Home</NavLink></li>}
        {isBusinessLoggedIn && <li className="nav-link"><NavLink to='/business-owner'>Home Biz</NavLink></li>}
        {isUserLoggedIn && <li className="nav-link"><NavLink to='/test'>Take the test</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && <li className="nav-link"><NavLink to='register-business'>Register your business</NavLink></li>}
        {isBusinessLoggedIn && <li className="nav-link"><NavLink to='create-offer'>Create new Hobby Offer</NavLink></li>}
        {isUserLoggedIn && <li className="nav-link"><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>}
        {isBusinessLoggedIn && <li className="nav-link"><NavLink to='account-business'>Account Biz</NavLink></li>}
        {isUserLoggedIn && <li className="nav-link"><NavLink to='account-user'>Account</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && <li className="nav-link"><NavLink to='login'>Login</NavLink></li>}
        {(isUserLoggedIn || isBusinessLoggedIn) && <li className="nav-link" onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>}
      </ul>
    </nav>

  )
}

export default Navbar

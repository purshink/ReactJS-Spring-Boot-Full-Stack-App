import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'
import AuthenticationService from '../api/hobby/AuthenticationService';


const Navbar = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

  return (

    <nav className={styles.navbar}>
      <ul className={styles.nav_links}>
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/user-home'>Home</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='/business-owner'>Home Biz</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/test'>Take the test</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && <li className={styles.nav_link}><NavLink to='register-business'>Register your business</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='create-offer'>Create new Hobby Offer</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='account-business'>Account Biz</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='account-user'>Account</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && <li className={styles.nav_link}><NavLink to='login'>Login</NavLink></li>}
        {(isUserLoggedIn || isBusinessLoggedIn) && <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>}
      </ul>
    </nav>

  )
}

export default Navbar

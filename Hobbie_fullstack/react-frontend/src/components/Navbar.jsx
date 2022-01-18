import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'
import AuthenticationService from '../api/hobby/AuthenticationService';
import '@ionic/react/css/core.css';
import { IonIcon } from '@ionic/react';
import {grid} from 'ionicons/icons';





const Navbar = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

  return (
    
    <nav className={styles.navbar}>
    <div className="menu">
      <IonIcon className={styles.menu} icon={grid}></IonIcon> 
      </div>
      <ul className={styles.nav_links}>
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/user-home'>Home</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='/business-owner'>Home</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/test'>Test</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && <li className={styles.nav_link}><NavLink to='register-business'>Register business</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='create-offer'>Create offer</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='account-business'>Account</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='account-user'>Account</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && <li className={styles.nav_link}><NavLink to='login'>Login</NavLink></li>}
        {(isUserLoggedIn || isBusinessLoggedIn) && <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>}
      </ul>
    </nav>

  )
}

export default Navbar

import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'
import AuthenticationService from '../api/hobby/AuthenticationService';
import '@ionic/react/css/core.css';
import { IonIcon } from '@ionic/react';
import {grid} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';



const Navbar = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
  const location = useLocation()
  console.log(location.pathname);


  const [clicked, setClicked] = useState(false);



  console.log(clicked);
  return (
    
    <nav className={styles.navbar}>
    <div className="menu">
      <IonIcon onClick={e => setClicked(!clicked)} className={styles.menu} icon={grid}></IonIcon> 
      {clicked &&   <div className={styles.popup_menu}> <ul className={styles.nav_links_popup}>
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/user-home'>Home</NavLink></li>}
        {!isUserLoggedIn && !isBusinessLoggedIn && location.pathname !== '/signup' && <li className={styles.nav_link}><NavLink to='/signup'>Sign up</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='/business-owner'>Home</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/test'>Test</NavLink></li>}
        {!isBusinessLoggedIn && location.pathname != '/register-business' &&  !isUserLoggedIn  && <li className={styles.nav_link}><NavLink to='register-business'>Register Bizz</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='create-offer'>Create offer</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='account-business'>Account</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='account-user'>Account</NavLink></li>}
        {!isBusinessLoggedIn && !isUserLoggedIn && location.pathname !== '/login' &&<li className={styles.nav_link}><NavLink to='login'>Login</NavLink></li>}
        {(isUserLoggedIn || isBusinessLoggedIn) && <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>}
      </ul></div>}
      </div>
      <ul className={styles.nav_links}>
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/user-home'>Home</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='/business-owner'>Home</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='/test'>Test</NavLink></li>}
        {!isBusinessLoggedIn && location.pathname != '/register-business' && location.pathname != '/signup' &&  !isUserLoggedIn && location.pathname != '/login' && location.pathname != '/change-password' && !(location.pathname.includes("/change-password-new"))&& <li className={styles.nav_link}><NavLink to='register-business'>Register Business</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='create-offer'>Create offer</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>}
        {isBusinessLoggedIn && <li className={styles.nav_link}><NavLink to='account-business'>Account</NavLink></li>}
        {isUserLoggedIn && <li className={styles.nav_link}><NavLink to='account-user'>Account</NavLink></li>}
        {!isBusinessLoggedIn && location.pathname != '/register-business' && location.pathname != '/signup' &&  location.pathname != '/login'  && !isUserLoggedIn && location.pathname != '/change-password' && !(location.pathname.includes("/change-password-new"))&& <li className={styles.nav_link}><NavLink to='login'>Login</NavLink></li>}
        {(isUserLoggedIn || isBusinessLoggedIn) && <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>}
      </ul>
    </nav>

  )
}

export default Navbar

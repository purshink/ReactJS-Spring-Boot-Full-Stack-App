import React from 'react'
import '@ionic/react/css/core.css';
import { IonIcon } from '@ionic/react';
import { grid } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import AuthenticationService from '../api/hobby/AuthenticationService';
import { NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'
import { useState } from 'react';

const Menu = () => {
    const [clicked, setClicked] = useState(false);
    const userLogged = AuthenticationService.isUserLoggedIn();
    const businessLogged = AuthenticationService.isBusinessLoggedIn();
    const location = useLocation()

    return (
        <div className="menu">
            <IonIcon onClick={e => setClicked(!clicked)} className={styles.menu} icon={grid}></IonIcon>
            {clicked && userLogged &&
                <div className={styles.popup_menu}>
                    <ul className={styles.nav_links_popup}>
                        <li className={styles.nav_link}><NavLink to='/user-home'>Home</NavLink></li>
                        <li className={styles.nav_link}><NavLink to='/test'>Test</NavLink></li>
                        <li className={styles.nav_link}><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>
                        <li className={styles.nav_link}><NavLink to='account-user'>Account</NavLink></li>
                        <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>
                    </ul>
                </div>}

            {clicked && businessLogged &&
                <div className={styles.popup_menu}> <ul className={styles.nav_links_popup}>
                    <li className={styles.nav_link}><NavLink to='/business-owner'>Home</NavLink></li>
                    <li className={styles.nav_link}><NavLink to='create-offer'>Create offer</NavLink></li>
                    <li className={styles.nav_link}><NavLink to='account-business'>Account</NavLink></li>
                    <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>
                </ul>
                </div>}

            {clicked && !businessLogged && !userLogged &&
                <div className={styles.popup_menu}> <ul className={styles.nav_links_popup}>
                    { location.pathname !== '/signup' && location.pathname !== '/' && <li className={styles.nav_link}><NavLink to='/signup'>Sign up</NavLink></li>}
                    {location.pathname != '/register-business' && <li className={styles.nav_link}><NavLink to='register-business'>Register Bizz</NavLink></li>}
                    {location.pathname !== '/login' && <li className={styles.nav_link}><NavLink to='login'>Login</NavLink></li>}
                </ul>
                </div>}
        </div>
    )
}

export default Menu
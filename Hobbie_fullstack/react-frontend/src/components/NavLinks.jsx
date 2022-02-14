import React from 'react'
import { useLocation } from 'react-router-dom';
import AuthenticationService from '../api/hobby/AuthenticationService';
import { NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'

const NavLinks = () => {
    const userLogged = AuthenticationService.isUserLoggedIn();
    const businessLogged = AuthenticationService.isBusinessLoggedIn();
    const location = useLocation()
    return (
        <>
            {userLogged && <ul className={styles.nav_links}>
                <li className={styles.nav_link}><NavLink to='/user-home'>Home</NavLink></li>
                <li className={styles.nav_link}><NavLink to='/test'>Test</NavLink></li>
                <li className={styles.nav_link}><NavLink to='my-hobbies' className="nav-link">My hobbies</NavLink></li>
                <li className={styles.nav_link}><NavLink to='account-user'>Account</NavLink></li>
                <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>
            </ul>}

            {businessLogged && <ul className={styles.nav_links}>
                <li className={styles.nav_link}><NavLink to='/business-owner'>Home</NavLink></li>
                <li className={styles.nav_link}><NavLink to='create-offer'>Create offer</NavLink></li>
                <li className={styles.nav_link}><NavLink to='account-business'>Account</NavLink></li>
                <li className={styles.nav_link} onClick={AuthenticationService.logout}><NavLink to='/'> Logout</NavLink></li>

            </ul>}

            {!userLogged && !businessLogged && <ul className={styles.nav_links}>
                {location.pathname !== '/signup' && location.pathname !== '/' && <li className={styles.nav_link}><NavLink to='/signup'>Sign up</NavLink></li>}
                {location.pathname != '/register-business' && <li className={styles.nav_link}><NavLink to='register-business'>Register Bizz</NavLink></li>}
                {location.pathname !== '/login' && <li className={styles.nav_link}><NavLink to='login'>Login</NavLink></li>}

            </ul>}

        </>
    )
}

export default NavLinks
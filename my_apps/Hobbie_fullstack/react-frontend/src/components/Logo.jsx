import React from 'react'

import logo from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/logo.svg'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService';

const Logo = () => {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
    return (
      
    <div  className="logo-container">
         { !isBusinessLoggedIn&& !isUserLoggedIn && <Link to='/' className=""><img className="imgHeader" src={logo} alt="logo"/></Link>}
          { !isBusinessLoggedIn&& !isUserLoggedIn &&<Link to='/' className=""> <h4 className="logo">obbie</h4></Link>}

          { isBusinessLoggedIn&& <Link to='/business-owner' className=""><img className="imgHeader" src={logo} alt="logo"/></Link>}
         { isBusinessLoggedIn&& <Link to='/business-owner' className=""> <h4 className="logo">obbie</h4></Link>}


         { isUserLoggedIn && <Link to='/user-home' className=""><img className="imgHeader" src={logo} alt="logo"/></Link>}
         { isUserLoggedIn &&<Link to='/user-home' className=""> <h4 className="logo">obbie</h4></Link>}
    </div>
   
    )
}

export default Logo

import React from 'react'
import { Outlet } from 'react-router';
import AuthenticationService from './AuthenticationService'
import { Navigate } from 'react-router';

const useAuth =() =>{
    return AuthenticationService.isBusinessLoggedIn();

}
const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> :  <Navigate to="/login"/>;
}

export default ProtectedRoutes


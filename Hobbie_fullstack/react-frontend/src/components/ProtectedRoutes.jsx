import React from 'react'
import { Outlet } from 'react-router';
import AuthenticationService from '../api/hobby/AuthenticationService';
import { Navigate } from 'react-router';

const useAuth = () => {
    return AuthenticationService.isUserLoggedIn();

}
const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes


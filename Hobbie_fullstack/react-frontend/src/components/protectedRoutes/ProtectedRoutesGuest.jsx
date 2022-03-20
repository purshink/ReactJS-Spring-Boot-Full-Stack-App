import React from "react";
import { Outlet } from "react-router-dom";
import AuthenticationService from "../../api/authentication/AuthenticationService";
import { Navigate } from "react-router-dom";

const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

const ProtectedRoutesGuest = () => {
  if (isUserLoggedIn) {
    return <Navigate to="/user-home" />;
  } else if (isBusinessLoggedIn) {
    return <Navigate to="/business-home" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutesGuest;

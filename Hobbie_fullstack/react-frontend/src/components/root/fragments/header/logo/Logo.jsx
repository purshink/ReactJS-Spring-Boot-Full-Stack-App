import React from "react";
import styles from "../../../../../css/Logo.module.css";
import logo from "../../../../../img/logo.svg";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Logo = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
  const navigate = useNavigate();

  return (
    <section className={styles.logo_container}>
      {!isBusinessLoggedIn && !isUserLoggedIn && (
        <NavLink onClick={() => navigate("/")} to="/" className="">
          <img className={styles.imgHeader} src={logo} alt="logo" />
        </NavLink>
      )}
      {!isBusinessLoggedIn && !isUserLoggedIn && (
        <NavLink onClick={() => navigate("/")} to="/" className="">
          <h4 className={styles.logo}>obbie</h4>
        </NavLink>
      )}

      {isBusinessLoggedIn && (
        <NavLink
          onClick={() => navigate("/business-home")}
          to="/business-home"
          className=""
        >
          <img className={styles.imgHeader} src={logo} alt="logo" />
        </NavLink>
      )}
      {isBusinessLoggedIn && (
        <NavLink
          onClick={() => navigate("/business-home")}
          to="/business-home"
          className=""
        >
          <h4 className={styles.logo}>obbie</h4>
        </NavLink>
      )}

      {isUserLoggedIn && (
        <NavLink
          onClick={() => navigate("/user-home")}
          to="/user-home"
          className=""
        >
          <img className={styles.imgHeader} src={logo} alt="logo" />
        </NavLink>
      )}
      {isUserLoggedIn && (
        <NavLink
          onClick={() => navigate("/user-home")}
          to="/user-home"
          className=""
        >
          <h4 className={styles.logo}>obbie</h4>
        </NavLink>
      )}
    </section>
  );
};

export default Logo;

import React from "react";
import styles from "../../../../../css/Logo.module.css";
import logo from "../../../../../img/logo.svg";
import { Link } from "react-router-dom";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";

const Logo = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();

  return (
    <section className={styles.logo_container}>
      {!isBusinessLoggedIn && !isUserLoggedIn && (
        <Link to="/" className="">
          <img className={styles.imgHeader} src={logo} alt="logo" />
        </Link>
      )}
      {!isBusinessLoggedIn && !isUserLoggedIn && (
        <Link to="/" className="">
          <h4 className={styles.logo}>obbie</h4>
        </Link>
      )}

      {isBusinessLoggedIn && (
        <Link to="/business-owner" className="">
          <img className={styles.imgHeader} src={logo} alt="logo" />
        </Link>
      )}
      {isBusinessLoggedIn && (
        <Link to="/business-owner" className="">
          <h4 className={styles.logo}>obbie</h4>
        </Link>
      )}

      {isUserLoggedIn && (
        <Link to="/user-home" className="">
          <img className={styles.imgHeader} src={logo} alt="logo" />
        </Link>
      )}
      {isUserLoggedIn && (
        <Link to="/user-home" className="">
          <h4 className={styles.logo}>obbie</h4>
        </Link>
      )}
    </section>
  );
};

export default Logo;

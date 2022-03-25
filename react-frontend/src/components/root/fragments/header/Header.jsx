import React from "react";
import styles from "../../../../css/Header.module.css";
import Navbar from "./navbar/Navbar";
import Logo from "./logo/Logo";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;

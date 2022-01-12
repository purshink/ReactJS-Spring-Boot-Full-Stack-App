import React from "react";
import Logo from "./Logo"
import styles from '../css/Header.module.css'
import Navbar from "./Navbar"

const Header = () => {

    return (
        <div className={styles.header}>
            <Logo />
            <Navbar />
        </div>
    )
}

export default Header



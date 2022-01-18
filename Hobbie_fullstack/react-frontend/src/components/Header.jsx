import React from "react";
import styles from '../css/Header.module.css'
import Navbar from "./Navbar"
import { useLocation } from "react-router-dom";
import Logo from "./Logo"

const Header = () => {
    const location = useLocation()
    return (
        <div className={styles.header}>
            <Logo />
            <Navbar />
        </div>
    )
}

export default Header



import React from 'react'
import cover from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/coverImg.png'
import styles from '../css/Cover.module.css'
const Cover = () => {
    return (
        <div>
            <img className={styles.cover_style} src={cover} alt="coverImg" />
        </div>
    )
}

export default Cover

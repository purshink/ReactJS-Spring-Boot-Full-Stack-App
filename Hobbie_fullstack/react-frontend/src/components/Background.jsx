import React from 'react'
import styles from '../css/Background.module.css'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'

const Background = () => {
    return (
        <div>
                 <img className={styles.blueImg2} src={blueImg} alt="blueImg2"></img>
        </div>
    )
}

export default Background

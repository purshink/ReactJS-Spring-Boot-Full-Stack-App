import React from 'react'
import styles from '../css/Background.module.css'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'

const BackgroundHome = () => {
    return (
        <div>
                 <img className={styles.blueImg3} src={blueImg} alt="blueImg2"></img>
                 <img className={styles.blueImg4} src={blueImg} alt="blueImg4" />
                 <img className={styles.blue} src={blueImg} alt="blue"></img>
        </div>
    )
}

export default BackgroundHome

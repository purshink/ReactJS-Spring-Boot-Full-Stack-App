import React from 'react'
import styles from '../css/Background.module.css'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import creative from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/creative.jpg'

const BackgroundHome = () => {
    return (
        <div>
              {/* <img className={styles.creative} src={creative} alt="blueImg4" /> */}
                 <img className={styles.blueImg3} src={blueImg} alt="blueImg3"></img>
                 <img className={styles.blueImg4} src={blueImg} alt="blueImg4" />
                 <img className={styles.blue} src={blueImg} alt="blue"></img>
        </div>
    )
}

export default BackgroundHome

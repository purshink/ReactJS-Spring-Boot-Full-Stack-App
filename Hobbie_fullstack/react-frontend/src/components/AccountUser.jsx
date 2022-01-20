import React from 'react'
import BackgroundHome from './BackgroundHome'
import dancingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import styles from '../css/Account.module.css'
import layout from '../css/UserHome.module.css'
import Footer from './Footer'


const AccountUser = () => {
    return (<div>
        <div className={layout.hobbie_main}>
            <div className={layout.hobbie_container_home}>
                <div className={styles.account_main}>
                    <div className={styles.account_container}>
                        <img className={styles.account_cover} src={dancingImg} alt="dancing" />
                        <div className={styles.account_content}>
                            <div className={styles.account_content_body}>
                                <div className={styles.account_label}>
                                    <span className={styles.account_title}><b>Account info</b></span>
                                    <hr className={styles.account_hr}></hr>
                                    <br></br>
                                    <p> Username: </p>
                                    <p> Email: </p>
                                    <p> Full Name: </p>
                                    <p> Gender: </p>
                                    <p> Change password: </p>
                                    <br></br>
                                    <div className={styles.account_buttons}>
                                        <a className={styles.account_btn} >Delete profile</a>
                                        <a className={styles.account_btn} >Edit profile</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <BackgroundHome />
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default AccountUser

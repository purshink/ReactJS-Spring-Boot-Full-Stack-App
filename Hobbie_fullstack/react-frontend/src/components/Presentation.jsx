
import React from "react";
import { Link } from 'react-router-dom';
import styles from '../css/Presentation.module.css'

const Presentation = () => {
    return (

        <section className={styles.presentation}>

            <div className={styles.introduction}>
                <div className={styles.intro_text}>
                    <h1>Ready to have fun?</h1>
                    <p>Find out the best activities for you in your area. Take our personalised test and help us help you discover your new passion.</p>
                </div>
                <div className={styles.buttons}>

                    <button className={styles.btn_first} method="POST">
                        <Link to='signup' className={styles.btn_first}>Sign up</Link>
                    </button>

                </div>
            </div>

        </section>




    )
}

export default Presentation

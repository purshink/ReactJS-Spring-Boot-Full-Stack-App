import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/Presentation.module.css";

const Presentation = () => {
  return (
    <section className={styles.presentation}>
      <section className={styles.introduction}>
        <article className={styles.intro_text}>
          <h1>Ready to have fun?</h1>
          <p>
            Find out the best activities for you in your area. Take our
            personalised hobbie-test and help us help you discover your new
            passion.
          </p>
        </article>

        <article className={styles.buttons}>
          <button className={styles.btn_first} method="POST">
            <Link to="signup" className={styles.btn_first}>
              Sign up
            </Link>
          </button>
        </article>
      </section>
    </section>
  );
};

export default Presentation;

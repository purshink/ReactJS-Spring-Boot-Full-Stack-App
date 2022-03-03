import React from "react";
import styles from "../../../css/Background.module.css";
import blueImg from "../../../img/blueImg.png";

const BackgroundCover = () => {
  return (
    <section>
      <img className={styles.blueImg} src={blueImg} alt="blueImg2"></img>
    </section>
  );
};

export default BackgroundCover;

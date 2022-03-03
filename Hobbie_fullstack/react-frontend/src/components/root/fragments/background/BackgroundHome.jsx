import React from "react";
import styles from "../../../../css/Background.module.css";
import blueImg from "../../../../img/blueImg.png";

const BackgroundHome = () => {
  return (
    <>
      <img className={styles.blueImg3} src={blueImg} alt="blueImg3"></img>
      <img className={styles.blueImg4} src={blueImg} alt="blueImg4" />
      <img className={styles.blue} src={blueImg} alt="blue"></img>
    </>
  );
};

export default BackgroundHome;

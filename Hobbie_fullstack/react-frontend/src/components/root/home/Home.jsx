import React from "react";
import BackgroundCover from "./BackgroundCover";
import Presentation from "./Presentation";
import Cover from "./Cover";
import Footer from "../fragments/footer/Footer";
import style from "../../../css/Footer.module.css";

const Home = () => {
  return (
    <>
      <main>
        <Presentation />
        <Cover />
        <BackgroundCover />
      </main>
      <Footer class={style.footer_cover} />
    </>
  );
};

export default Home;

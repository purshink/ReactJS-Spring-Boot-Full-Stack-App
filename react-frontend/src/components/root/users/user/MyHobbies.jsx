import React from "react";
import Footer from "../../fragments/footer/Footer";
import styles from "../../../../css/UserHome.module.css";
import style from "../../../../css/Footer.module.css";
import BackgroundHome from "../../fragments/background/BackgroundHome";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyHobbiesDataService from "../../../../api/hobby/MyHobbiesDataService";

const MyHobbies = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    hobbies: [],
  });

  const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });

  const handleSort = (value) => (event) => {
    event.preventDefault();
    let path = "/hobbie/" + value;
    navigate(path, { state: { id: value } });
  };

  useLayoutEffect(() => {
    let unmounted = false;

    MyHobbiesDataService().then((response) => {
      if (!unmounted) {
        setState(response.data);
        setWelcomeDiv({ showDiv: false });
      }
      if (!Object.keys(response.data).length) {
        setWelcomeDiv({ showDiv: true });
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <>
      <BackgroundHome />
      <main className={styles.hobbie_main}>
        <section className={styles.hobbie_container_home}>
          {state.length !== undefined && (
            <section className={styles.cards}>
              {state.map((hobby) => (
                <div key={hobby.id} className={styles.rapper}>
                  <Link
                    to="#"
                    onClick={handleSort(hobby.id)}
                    className={styles.card}
                    id={hobby.id}
                  >
                    <section className={styles.card_image_container}>
                      <img src={hobby.profileImgUrl} alt="hobby" />
                    </section>

                    <section className={styles.card_content}>
                      <p className={styles.card_title}>{hobby.name}</p>
                      <div className={styles.card_info}>
                        <p className={styles.text_medium}> Find out more...</p>
                        <p className={styles.card_price}>{hobby.price} CHF</p>
                      </div>
                    </section>
                  </Link>
                </div>
              ))}
            </section>
          )}

          {welcomeDiv.showDiv && (
            <div>
              <article className={styles.introduction_home}>
                <div className={styles.intro_text}>
                  <p>You have no saved hobbies.</p>
                </div>
              </article>
            </div>
          )}
        </section>
      </main>
      <Footer class={style.footer_hobbie_details} />
    </>
  );
};

export default MyHobbies;

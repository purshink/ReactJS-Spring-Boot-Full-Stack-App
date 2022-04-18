import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundHome from "../../../fragments/background/BackgroundHome";
import dancingImg from "../../../../../img/2.jpg";
import styles from "../../../../../css/Account.module.css";
import style from "../../../../../css/Footer.module.css";
import layout from "../../../../../css/UserHome.module.css";
import Footer from "../../../fragments/footer/Footer";
import UserDataService from "../../../../../api/users/UserDataService";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import DeleteUserService from "../../../../../api/users/DeleteUserService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";

const AccountUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleDelete = (user) => (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Delete Profile",
      message: "Are you sure you want to delete your profile?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await DeleteUserService(user.id);
            if (response.data !== null) {
              AuthenticationService.logout();
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleEdit = (user) => (event) => {
    event.preventDefault();
    let path = "/edit-profile";
    navigate(path, {
      state: { id: user.id, gender: user.gender, fullName: user.fullName },
    });
  };

  useLayoutEffect(() => {
    let unmounted = false;

    UserDataService().then((response) => {
      if (!unmounted) {
        setUser(response.data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <>
      <main className={layout.hobbie_main}>
        <section className={layout.hobbie_container_home}>
          <section className={styles.account_container}>
            <img
              className={styles.account_cover}
              src={dancingImg}
              alt="dancing"
            />
            <div className={styles.account_content}>
              <span className={styles.account_title}>
                <b>Account info</b>
              </span>
              <hr className={styles.account_hr}></hr>
              <br></br>
              <p> Username: {user.username} </p>
              <p> Email: {user.email}</p>
              <p> Full Name: {user.fullName} </p>
              <p> Gender: {user.gender} </p>
              <p> Change password: **** </p>
              <br></br>
              <article className={styles.account_buttons}>
                <Link
                  to="#"
                  onClick={handleDelete(user)}
                  className={styles.account_btn}
                >
                  Delete
                </Link>
                <Link
                  to="#"
                  onClick={handleEdit(user)}
                  className={styles.account_btn}
                >
                  Edit
                </Link>
              </article>
            </div>
          </section>

          <BackgroundHome />
        </section>
      </main>
      <Footer class={style.footer_hobbie_details} />
    </>
  );
};

export default AccountUser;

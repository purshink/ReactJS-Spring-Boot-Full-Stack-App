import React from "react";
import BackgroundHome from "../../../fragments/background/BackgroundHome";
import dancingImg from "../../../../../img/2.jpg";
import styles from "../../../../../css/Account.module.css";
import layout from "../../../../../css/UserHome.module.css";
import Footer from "../../../fragments/footer/Footer";
import style from "../../../../../css/Footer.module.css";
import BusinessDataService from "../../../../../api/users/BusinessDataService";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteUserService from "../../../../../api/users/DeleteUserService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";

const AccountBusiness = () => {
  const navigate = useNavigate();
  const [business, setBusiness] = useState([]);

  const handleDelete = (business) => (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Delete Profile",
      message: "Are you sure you want to delete your profile?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await DeleteUserService(business.id);

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

  const handleEdit = (business) => (event) => {
    event.preventDefault();
    let path = "/edit-business-profile";
    navigate(path, {
      state: {
        id: business.id,
        businessName: business.businessName,
        address: business.address,
      },
    });
  };

  useLayoutEffect(() => {
    let unmounted = false;

    BusinessDataService().then((response) => {
      if (!unmounted) {
        setBusiness(response.data);
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
              <p>Username: {business.username} </p>
              <p>Email: {business.email} </p>
              <p>Business name: {business.businessName} </p>
              <p>Business address: {business.address} </p>
              <p>Change password: **** </p>
              <br></br>
              <article className={styles.account_buttons}>
                <Link
                  to="#"
                  onClick={handleDelete(business)}
                  className={styles.account_btn}
                >
                  Delete
                </Link>
                <Link
                  to="#"
                  onClick={handleEdit(business)}
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

export default AccountBusiness;

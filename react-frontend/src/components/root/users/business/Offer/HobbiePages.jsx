import React from "react";
import styles from "../../../../../css/Hobbie.module.css";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HobbyDetailsDataService from "../../../../../api/hobby/HobbyDetailsDataService";
import { useMediaQuery } from "beautiful-react-hooks";
import gallery_styles from "../../../../../css/Gallery.module.css";
import DeleteHobbyService from "../../../../../api/hobby/DeleteHobbyService";
import IsHobbySavedService from "../../../../../api/hobby/IsHobbySavedService";
import SaveHobbyService from "../../../../../api/hobby/SaveHobbyService";
import RemoveHobbyService from "../../../../../api/hobby/RemoveHobbyService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const HobbiePages = () => {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
  let navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  let params = useParams();

  const id = params.id;
  const [currentPage, setCurrentPage] = useState("about");

  const [hobby, setHobby] = useState({
    name: "",
    slogan: "",
    intro: "",
    description: "",
    price: "",
    profileImgUrl: "",
    galleryImgUrl1: "",
    galleryImgUrl2: "",
    galleryImgUrl3: "",
    contactInfo: "",
  });

  const [hobbieDiv, setHobbieDiv] = useState({ showDiv: false });

  const handleDelete = (hobby) => (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Delete Offer",
      message: "Are you sure you want to delete this offer?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await DeleteHobbyService(hobby.id);

            if (response.data !== null) {
              window.location.href = "/business-home";
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleEdit = (hobby) => (event) => {
    event.preventDefault();
    let path = "/edit-offer";
    navigate(path, {
      state: {
        id: hobby.id,
        name: hobby.name,
        slogan: hobby.slogan,
        intro: hobby.intro,
        description: hobby.description,
        price: hobby.price,
        contactInfo: hobby.contactInfo,
        profileImgUrl: hobby.profileImgUrl,
        galleryImgUrl1: hobby.galleryImgUrl1,
        galleryImgUrl2: hobby.galleryImgUrl2,
        galleryImgUrl3: hobby.galleryImgUrl3,
      },
    });
  };

  const handleSave = (id) => (event) => {
    event.preventDefault();

    if (!saved) {
      SaveHobbyService(id).then((response) => {
        setSaved(true);
        console.log(saved);
      });
    } else {
      RemoveHobbyService(id).then((response) => {
        setSaved(false);
        console.log(saved);
      });
    }
  };

  useEffect(() => {
    let unmounted = false;

    if (isUserLoggedIn) {
      IsHobbySavedService(id).then((response) => {
        if (!unmounted) {
          setSaved(response.data);
          console.log(saved);
        }
      });
    }
    if (isBusinessLoggedIn || isUserLoggedIn) {
      HobbyDetailsDataService(id).then((response) => {
        if (!unmounted) {
          setHobby(response.data);
          console.log(response.data);
          setHobbieDiv({ showDiv: false });
        }
        if (!Object.keys(response.data).length) {
          setHobbieDiv({ showDiv: true });
        }
      });
    }
    return () => {
      unmounted = true;
    };
  }, [id, isUserLoggedIn, isBusinessLoggedIn, saved]);

  const isColumnBasedSmall = useMediaQuery("(max-width: 1200px)");

  const changePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      {isColumnBasedSmall && (
        <div>
          {" "}
          <span className={styles.hobbie_title_small}>
            <b>{hobby.name}</b>
          </span>{" "}
          <h4 className={styles.slogan_small}> {hobby.slogan} </h4>
        </div>
      )}

      <section
        className={
          isColumnBasedSmall
            ? styles.hobbie_container_small
            : styles.hobbie_container
        }
      >
        {hobby !== undefined && (
          <div
            className={
              isColumnBasedSmall
                ? styles.hobbie_content_small
                : styles.hobbie_content
            }
          >
            {currentPage !== "gallery" && (
              <section className={styles.hobbie_cover}>
                <img
                  className={styles.hobbie_cover}
                  src={hobby.profileImgUrl}
                  alt="profile"
                />
              </section>
            )}

            <div
              className={
                isColumnBasedSmall
                  ? styles.hobbie_content_body_small
                  : styles.hobbie_content_body
              }
            >
              {!isColumnBasedSmall && (
                <article className={styles.hobbie_pages}>
                  <span
                    onClick={() => changePage("about")}
                    className={
                      currentPage === "about" ? styles.hobbie_active : ""
                    }
                  >
                    about
                  </span>
                  <span
                    onClick={() => changePage("more")}
                    className={
                      currentPage === "more" ? styles.hobbie_active : ""
                    }
                  >
                    more
                  </span>
                  <span
                    onClick={() => changePage("gallery")}
                    className={
                      currentPage === "gallery" ? styles.hobbie_active : ""
                    }
                  >
                    gallery
                  </span>
                  <span
                    onClick={() => changePage("contact")}
                    className={
                      currentPage === "contact" ? styles.hobbie_active : ""
                    }
                  >
                    contact
                  </span>
                </article>
              )}

              {isColumnBasedSmall && (
                <article className={styles.hobbie_pages_horizontal}>
                  <span
                    onClick={() => changePage("about")}
                    className={
                      currentPage === "about"
                        ? styles.hobbie_active_small
                        : styles.hobbie_small
                    }
                  >
                    about
                  </span>
                  <span
                    onClick={() => changePage("more")}
                    className={
                      currentPage === "more"
                        ? styles.hobbie_active_small
                        : styles.hobbie_small
                    }
                  >
                    more
                  </span>
                  <span
                    onClick={() => changePage("gallery")}
                    className={
                      currentPage === "gallery"
                        ? styles.hobbie_active_small
                        : styles.hobbie_small
                    }
                  >
                    gallery
                  </span>
                  <span
                    onClick={() => changePage("contact")}
                    className={
                      currentPage === "contact"
                        ? styles.hobbie_active_small
                        : styles.hobbie_small
                    }
                  >
                    contact
                  </span>
                </article>
              )}

              <section className={styles.hobbie_lable}>
                {!isColumnBasedSmall && (
                  <div>
                    {" "}
                    <span className={styles.hobbie_title}>
                      <b>{hobby.name}</b>
                    </span>
                    <h4 className={styles.slogan}> {hobby.slogan} </h4>
                  </div>
                )}

                {currentPage === "about" && <p>{hobby.intro}</p>}

                {currentPage === "more" && <p> {hobby.description} </p>}

                {currentPage === "gallery" && (
                  <section className={gallery_styles.gallery}>
                    <div className={gallery_styles.row}>
                      <article className={gallery_styles.column}>
                        <img
                          className={gallery_styles.img}
                          src={hobby.profileImgUrl}
                          alt="gallery"
                        />
                        <img
                          className={gallery_styles.img}
                          src={hobby.galleryImgUrl1}
                          alt="gallery"
                        />
                      </article>

                      <article className={gallery_styles.column}>
                        <img
                          className={gallery_styles.img}
                          src={hobby.galleryImgUrl2}
                          alt="gallery"
                        />
                        <img
                          className={gallery_styles.img}
                          src={hobby.galleryImgUrl3}
                          alt="gallery"
                        />
                      </article>
                    </div>
                  </section>
                )}

                {currentPage === "contact" && <p> {hobby.contactInfo} </p>}

                {currentPage !== "gallery" && (
                  <article className={styles.buttons}>
                    {isBusinessLoggedIn && (
                      <div>
                        <Link
                          to="#"
                          onClick={handleEdit(hobby)}
                          className={styles.btn}
                        >
                          Edit{" "}
                        </Link>
                        <Link
                          to="#"
                          onClick={handleDelete(hobby)}
                          className={styles.btn}
                        >
                          Delete{" "}
                        </Link>
                      </div>
                    )}
                    {isUserLoggedIn && (
                      <div onClick={handleSave(hobby.id)}>
                        {saved ? (
                          <span className={styles.btn}>Remove</span>
                        ) : (
                          <span className={styles.btn}>Save</span>
                        )}
                      </div>
                    )}
                  </article>
                )}
              </section>
            </div>
          </div>
        )}

        {hobbieDiv.showDiv && (
          <div className={styles.error_message}>
            <article className={styles.error_text}>
              <p> This hobby does not exist.</p>
            </article>
          </div>
        )}
      </section>
    </>
  );
};

export default HobbiePages;

import React from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../../../css/Forms.module.css";
import style from "../../../../../css/Footer.module.css";
import { useLocation } from "react-router-dom";
import UpdateUserDataService from "../../../../../api/users/UpdateUserDataService";
import LoadingDotsDark from "../../login/animation/LoadingDotsDark";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [checked, setCheckBoxChecked] = useState("other");
  const [info, setInfo] = useState({
    id: location.state.id,
    fullName: location.state.fullName,
    gender: "OTHER",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.fullName) {
      errors.fullName = "Required";
    } else if (info.fullName.length < 2 || info.fullName.length > 20) {
      errors.fullName = "2 and 20 char";
    }

    if (!info.password) {
      errors.password = "Password is required";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Required";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Don't match";
    }

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const response = await UpdateUserDataService(info);

      if (response.status === 201) {
        navigate("/account-user");
      }
    } else {
      setLoading(false);
      console.log(errors);
    }
  };

  return (
    <>
      <main className={styles.form_style}>
        <h2>Edit account</h2>

        <form id="userInfo" onSubmit={submitHandler}>
          <section className={styles.form_field}>
            <input
              defaultValue={location.state.fullName}
              type="text"
              name="name"
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
            />
            <label htmlFor="name" className={styles.label_name}>
              <span className={styles.content_name}>Full Name</span>
              {errors.fullName && (
                <small className={styles.errors}>Invalid Full Name</small>
              )}
            </label>
          </section>

          <section className={styles.form_field_radio}>
            <section className={styles.name_section}>
              <label id="gender" className={styles.label_name}>
                <span className={styles.content_name}>Gender</span>
              </label>
            </section>
            <section className={styles.checkbox_choice_section}>
              <input
                onClick={() => setCheckBoxChecked("male")}
                onChange={(e) => setInfo({ ...info, gender: "MALE" })}
                checked={checked === "male"}
                type="checkbox"
                id="checkbox1"
              />
              <label className={styles.checkbox} htmlFor="checkbox1">
                Male
              </label>
              <input
                onClick={() => setCheckBoxChecked("female")}
                onChange={(e) => setInfo({ ...info, gender: "FEMALE" })}
                checked={checked === "female"}
                type="checkbox"
                id="checkbox2"
              />
              <label className={styles.checkbox} htmlFor="checkbox1">
                Female
              </label>
              <input
                onClick={() => setCheckBoxChecked("other")}
                onChange={(e) => setInfo({ ...info, gender: "OTHER" })}
                checked={checked === "other"}
                type="checkbox"
                id="checkbox3"
              />
              <label className={styles.checkbox} htmlFor="checkbox1">
                Other
              </label>
            </section>
          </section>

          <section className={styles.form_field}>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />

            <label htmlFor="name" className={styles.label_name}>
              <span className={styles.content_name}>Password</span>
              {errors.password && (
                <small className={styles.errors}>Invalid password</small>
              )}
            </label>
          </section>

          <section className={styles.form_field}>
            <input
              id="repassword"
              name="repassword"
              type="password"
              onChange={(e) =>
                setInfo({ ...info, repeatpassword: e.target.value })
              }
            />

            <label htmlFor="repassword" className={styles.label_name}>
              <span className={styles.content_name}>Confirm Password</span>
              {errors.repeatpassword && (
                <small className={styles.errors}>{errors.repeatpassword}</small>
              )}
            </label>
          </section>

          <article className={styles.form_field}>
            {loading && <LoadingDotsDark />}

            {!loading && (
              <button id="button" type="submit" className={styles.button}>
                Save
              </button>
            )}
          </article>
        </form>
      </main>
      <Footer class={style.footer} />
      <Background />
    </>
  );
};

export default EditUserProfile;

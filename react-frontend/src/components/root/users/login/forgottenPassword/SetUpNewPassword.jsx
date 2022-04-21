import React from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../../../css/Forms.module.css";
import style from "../../../../../css/Footer.module.css";
import UpdatePasswordService from "../../../../../api/login/forgottenPassword/UpdatePasswordService";
import LoadingDotsDark from "../animation/LoadingDotsDark";

const SetUpNewPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState({
    password: "",
    repeatpassword: "",
  });

  const validate = () => {
    const errors = {};

    if (!info.password) {
      errors.password = "A password is required";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Repeate password";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
    }

    return errors;
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(info);
      setLoading(true);
      const response = await UpdatePasswordService(id, info.password);
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      }
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <main>
        <form className={styles.form_style}>
          <div>
            <div className={styles.form_field}>
              <section className={styles.name_section}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                />

                <label htmlFor="password" className={styles.label_name}>
                  <span className={styles.content_name}>Password</span>
                  {errors.password && (
                    <small className={styles.errors}>Invalid password</small>
                  )}
                </label>
              </section>
            </div>

            <div className={styles.form_field}>
              <section className={styles.name_section}>
                <input
                  id="repassword"
                  name="repassword"
                  type="password"
                  onChange={(e) =>
                    setInfo({ ...info, repeatpassword: e.target.value })
                  }
                />

                <label htmlFor="repassword" className={styles.label_name}>
                  {!errors.repeatpassword && (
                    <span className={styles.content_name}>
                      Confirm Password
                    </span>
                  )}
                  {errors.repeatpassword && (
                    <small className={styles.errors}>
                      {errors.repeatpassword}
                    </small>
                  )}
                </label>
              </section>
            </div>
            {loading && <LoadingDotsDark />}

            {!loading && (
              <button className={styles.button} onClick={updatePassword}>
                Submit
              </button>
            )}
          </div>
        </form>
      </main>
      <Footer class={style.footer_cover} />
      <Background />
    </>
  );
};

export default SetUpNewPassword;

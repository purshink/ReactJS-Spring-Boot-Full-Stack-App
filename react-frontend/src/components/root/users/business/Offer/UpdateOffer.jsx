import React from "react";
import OfferInputField from "./fields/OfferInputField";
import OfferTextaria from "./fields/OfferTextaria";
import Footer from "../../../fragments/footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import UpdateOfferDataService from "../../../../../api/hobby/UpdateOfferDataService";
import { useState, useEffect } from "react";
import styles from "../../../../../css/CreateOffer.module.css";
import style from "../../../../../css/Footer.module.css";
import { useLocation } from "react-router-dom";
import LoadingDots from "./animation/LoadingDots";

const UpdateOffer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const username = AuthenticationService.getLoggedInUser();
  const [uploaded, setUploaded] = useState(false);

  const [files, setFiles] = useState({});
  const [info, setInfo] = useState({
    id: location.state.id,
    name: location.state.name,
    slogan: location.state.slogan,
    intro: location.state.intro,
    description: location.state.description,
    price: location.state.price,
    creator: username,
    contactInfo: location.state.contactInfo,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!files.profileImgUrl) {
      errors.profileImgUrl = "Profile photo is required";
    }
    if (!info.name) {
      errors.name = "Hobby name is required";
    } else if (info.name.length < 3) {
      errors.name = "Hobby name must be at least 3 characters long";
    }

    if (!info.slogan) {
      errors.slogan = "Slogan is required";
    } else if (info.slogan.length < 2 || info.slogan.length > 20) {
      errors.slogan = "Text has to be between 2 and 20 characters long";
    }

    if (!info.category) {
      errors.category = "Category is required";
    }

    if (!info.intro) {
      errors.intro = "Intro is required";
    }
    // else if (info.intro.length > 100 ) {
    //     errors.intro = "Text has to be at least 100 characters long"
    // }

    if (!info.description) {
      errors.description = "Description is required";
    }
    // else if (info.description.length  > 200) {
    //     errors.description = "Text has to be at least 500 characters long"
    // }

    if (!info.price) {
      errors.price = "Price is required";
    }

    if (!info.location) {
      errors.location = "Location is required";
    }
    if (!files.galleryImgUrl1) {
      errors.galleryImgUrl1 = "You must upload 3 high quality photos";
    }
    if (!files.galleryImgUrl2) {
      errors.galleryImgUrl2 = "You must upload 3 high quality photos";
    }
    if (!files.galleryImgUrl3) {
      errors.galleryImgUrl3 = "You must upload 3 high quality photos";
    }

    if (!info.contactInfo) {
      errors.contactInfo = "Contact info is required";
    }
    // else if (info.contactInfo.length < 20 || info.contactInfo.length > 200) {
    //     errors.contactInfo = "Text has to be between 20 and 200 characters long"
    // }
    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const public_ids = [];
    const img_urls = [];
    let fileURL = "";

    let errors = validate(info);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const filesToUpload = [
        files.profileImgUrl,
        files.galleryImgUrl1,
        files.galleryImgUrl2,
        files.galleryImgUrl3,
      ];
      const uploaders = filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", `dv6ktrxwv, hobbie`);
        formData.append("upload_preset", "vgf01lnc");
        formData.append("timestamp", (Date.now() / 1000) | 0);

        return await axios
          .post(
            "https://api.cloudinary.com/v1_1/dv6ktrxwv/image/upload",
            formData,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
          )
          .then(({ data }) => {
            fileURL = data.secure_url;
            img_urls.push(fileURL);
            public_ids.push(data.public_id);
          });
      });

      // Once all the files are uploaded
      axios.all(uploaders).then(() => {
        setInfo((prevState) => ({
          ...prevState,
          profileImgUrl: img_urls[0],
          galleryImgUrl1: img_urls[1],
          galleryImgUrl2: img_urls[2],
          galleryImgUrl3: img_urls[3],
          profileImg_id: public_ids[0],
          galleryImg1_id: public_ids[1],
          galleryImg2_id: public_ids[2],
          galleryImg3_id: public_ids[3],
        }));
        setUploaded(true);
      });
    } else {
      console.log(errors);
    }
  };

  useEffect(() => {
    const check_uploaded = () => {
      if (uploaded) {
        UpdateOfferDataService(info)
          .then((res) => {
            if (res.data != null) {
              window.location.href = "/offer/" + info.id;
            }
          })
          .catch((err) => {
            let error = "";
            setLoading(false);
            if (err.response) {
              error += err.response;
            }
            return error;
          });
      }
    };
    check_uploaded();
  }, [uploaded, info, navigate]);

  return (
    <>
      <main className={styles.offer_main}>
        <h1 className={styles.title_offer}>Edit offer</h1>
        <form className={styles.form_offer} onSubmit={submitHandler}>
          <OfferInputField
            defaultValue={location.state.name}
            type="text"
            placeholder="ex: Painting, Swimming classes etc.."
            label="Hobbie Name"
            name="name"
            error={errors.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <OfferInputField
            defaultValue={location.state.slogan}
            type="text"
            placeholder="your offer in one sentence..."
            label="Slogan"
            name="slogan"
            error={errors.slogan}
            onChange={(e) => setInfo({ ...info, slogan: e.target.value })}
          />

          <div className={styles.form_field_2}>
            <span>Category</span>
            <select
              onChange={(e) => setInfo({ ...info, category: e.target.value })}
              className={styles.custom_select}
              id="category"
              name="category"
            >
              <option value="">Select category</option>
              <option value="ACTIVE">Active</option>
              <option value="SOCIAL">Social</option>
              <option value="FUN">Fun</option>
              <option value="RELAX">Relax</option>
              <option value="INTELLECTUAL">Intellectual</option>
              <option value="CREATIVE">Creative</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.category && (
              <small className={styles.errors_offer}>{errors.category}</small>
            )}
          </div>
          <OfferTextaria
            defaultValue={location.state.intro}
            label="Intro"
            name="intro"
            error={errors.intro}
            onChange={(e) => setInfo({ ...info, intro: e.target.value })}
          />

          <OfferTextaria
            defaultValue={location.state.description}
            label="Description"
            name="description"
            error={errors.description}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
          />

          <OfferInputField
            defaultValue={location.state.price}
            type="number"
            placeholder=""
            label="Price per entry"
            name="price"
            error={errors.price}
            onChange={(e) => setInfo({ ...info, price: e.target.value })}
          />

          <div className={styles.form_field_2}>
            <span>Location</span>
            <select
              onChange={(e) => setInfo({ ...info, location: e.target.value })}
              className={styles.custom_select}
              id="location"
              name="location"
            >
              <option value="">Select location</option>
              <option value="ZURICH">Zurich</option>
              <option value="BERN">Bern</option>
              <option value="ZUG">Zug</option>
              <option value="LUZERN">Luzern</option>
            </select>
            {errors.location && (
              <small className={styles.errors_offer}>{errors.location}</small>
            )}
          </div>

          <div className={styles.form_field_photos}>
            <div className={styles.row_upload}>
              <label id="photo" className={styles.label_name}>
                <span className="">Gallery</span>
              </label>
              <article className={styles.button3}>
                <p className={styles.choose_file}>
                  {" "}
                  {files.profileImgUrl ? "Photo uploaded" : "Choose a file"}
                </p>
                <input
                  onChange={(e) =>
                    setFiles({ ...files, profileImgUrl: e.target.files[0] })
                  }
                  type="file"
                  id="add-title-image"
                  name="img"
                />
              </article>
              <article className={styles.button3}>
                <p className={styles.choose_file}>
                  {" "}
                  {files.galleryImgUrl1 ? "Photo uploaded" : "Choose a file"}
                </p>
                <input
                  onChange={(e) =>
                    setFiles({ ...files, galleryImgUrl1: e.target.files[0] })
                  }
                  type="file"
                  id="add-title-image"
                  name="img"
                />
              </article>
              <article className={styles.button3}>
                <p className={styles.choose_file}>
                  {" "}
                  {files.galleryImgUrl2 ? "Photo uploaded" : "Choose a file"}
                </p>
                <input
                  onChange={(e) =>
                    setFiles({ ...files, galleryImgUrl2: e.target.files[0] })
                  }
                  type="file"
                  id="add-title-image"
                  name="img"
                />
              </article>
              <article className={styles.button3}>
                <p className={styles.choose_file}>
                  {" "}
                  {files.galleryImgUrl3 ? "Photo uploaded" : "Choose a file"}
                </p>
                <input
                  onChange={(e) =>
                    setFiles({ ...files, galleryImgUrl3: e.target.files[0] })
                  }
                  type="file"
                  id="add-title-image"
                  name="img"
                />
              </article>
              {(errors.galleryImgUrl1 ||
                errors.galleryImgUrl2 ||
                errors.galleryImgUrl3 ||
                errors.profileImgUrl) && (
                <div className={styles.errors_offer}>
                  You must upload high quality photos
                </div>
              )}
            </div>
          </div>
          <OfferTextaria
            defaultValue={location.state.contactInfo}
            label="Contact info"
            name="contact"
            error={errors.contact}
            onChange={(e) => setInfo({ ...info, contactInfo: e.target.value })}
          />

          {loading && <LoadingDots />}

          {!loading && (
            <button type="submit" className={styles.submit_offer}>
              Submit
            </button>
          )}
        </form>
      </main>

      <Footer class={style.footer_hobbie_details} />
    </>
  );
};

export default UpdateOffer;

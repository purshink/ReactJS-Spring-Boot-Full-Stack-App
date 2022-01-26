import React from 'react'
import FooterDetails from './FooterDetails'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthenticationService from '../api/hobby/AuthenticationService'
import UpdateOfferDataService from '../api/hobby/UpdateOfferDataService'
import { useState, useEffect } from 'react'
import styles from '../css/CreateOffer.module.css'
import { useLocation } from 'react-router-dom';



const UpdateOffer = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let username = AuthenticationService.getLoggedInUser();
    let [uploaded, setUploaded] = useState(false);
      let public_ids= [];
    let img_urls = [];
    let fileURL = '';
    const [files, setFiles] = useState({});
    const [info, setInfo] = useState({
        id: location.state.id,
        name: location.state.name,
        slogan: location.state.slogan,
        intro: location.state.intro,
        description: location.state.description,
        price: location.state.price,
        creator: username,
        contactInfo: location.state.contactInfo

    });
    console.log(info)
    const [errors, setErrors] = useState({});


    const validate = () => {
        const errors = {};

        if (!files.profileImgUrl) {
            errors.profileImgUrl = 'Profile photo is required'
        }
        if (!info.name) {
            errors.name = 'Hobby name is required'
        } else if (info.name.length < 3) {
            errors.name = 'Hobby name must be at least 3 characters long'
        }

        if (!info.slogan) {
            errors.slogan = "Slogan is required"
        } else if (info.slogan.length < 2 || info.slogan.length > 20) {
            errors.slogan = "Text has to be between 2 and 20 characters long"
        }

        if (!info.category) {
            errors.category = "Category is required"
        }

        if (!info.intro) {
            errors.intro = "Intro is required"
        }
        // else if (info.intro.length > 100 ) {
        //     errors.intro = "Text has to be at least 100 characters long"
        // }

        if (!info.description) {
            errors.description = "Description is required"
        }
        // else if (info.description.length  > 200) {
        //     errors.description = "Text has to be at least 500 characters long"
        // }

        if (!info.price) {
            errors.price = "Price is required"
        }


        if (!info.location) {
            errors.location = "Location is required"
        }
        if (!files.galleryImgUrl1) {
            errors.galleryImgUrl1 = "You must upload 3 high quality photos"
        }
        if (!files.galleryImgUrl2) {
            errors.galleryImgUrl2 = "You must upload 3 high quality photos"
        }
        if (!files.galleryImgUrl3) {
            errors.galleryImgUrl3 = "You must upload 3 high quality photos"
        }



        if (!info.contactInfo) {
            errors.contactInfo = "Contact info is required"
        }
        // else if (info.contactInfo.length < 20 || info.contactInfo.length > 200) {
        //     errors.contactInfo = "Text has to be between 20 and 200 characters long"
        // }
        return errors;
    }



    const submitHandler = (event) => {
        event.preventDefault();


        let errors = validate(info)
        setErrors(errors);
        if (Object.keys(errors).length === 0) {

            const filesToUpload = [files.profileImgUrl, files.galleryImgUrl1, files.galleryImgUrl2, files.galleryImgUrl3];
            alert("Loading... please wait")
            const uploaders = filesToUpload.map(async file => {

                const formData = new FormData();
                formData.append("file", file);
                formData.append("tags", `dv6ktrxwv, hobbie`);
                formData.append("upload_preset", "vgf01lnc");
                formData.append("timestamp", (Date.now() / 1000) | 0);


                return await axios.post("https://api.cloudinary.com/v1_1/dv6ktrxwv/image/upload", formData, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                }).then(response => {
                    const data = response.data;
                    const public_id = data.public_id;
                    console.log(data)
                    fileURL = data.secure_url
                    img_urls.push(fileURL);
                    public_ids.push(public_id);
                });
            });

            // Once all the files are uploaded 
            axios.all(uploaders).then(() => {
                console.log(img_urls[0]);
                setInfo(prevState => ({
                    ...prevState, profileImgUrl: img_urls[0], galleryImgUrl1: img_urls[1], galleryImgUrl2: img_urls[2],
                    galleryImgUrl3: img_urls[3], profileImg_id: public_ids[0], galleryImg1_id: public_ids[1], galleryImg2_id: public_ids[2],
                    galleryImg3_id: public_ids[3]
                }));
                setUploaded(true);
            });
        }
        else {
            console.log(errors);
        }
    }

    useEffect(() => {
        const check_uploaded = () => {
            if (uploaded) {

                UpdateOfferDataService(info);
                let path = '/offer/' + info.id;
                navigate(path);
        
                window.location.reload(false)
           
            }
        }
        check_uploaded()
    }, [uploaded, info, navigate])


    return (
        <div>
                    <div className={styles.create_offer}>
                        <div className={styles.offer_main}>
                            <h1 className={styles.title_offer}>Edit offer</h1>
                            <form className={styles.form_offer} onSubmit={submitHandler}>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_photos}>
                                        <div>
                                            <div className={styles.row_upload}>
                                                <label id="photo" className={styles.label_name}>
                                                    <span>Profile Photo</span>
                                                </label>
                                                <div className={styles.button3}>
                                                    <p className={styles.choose_file}>  {files.profileImgUrl ?
                                                        "Photo uploaded" : "Choose a file"}</p>
                                                    <input onChange={e => setFiles({ ...files, profileImgUrl: e.target.files[0] })} type="file" id="add-title-image" name="img" />

                                                </div>

                                                {errors.profilePhoto && <div className={styles.errors_offer} >
                                                    {errors.profilePhoto}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_2}>
                                        <div className={styles.name_section}>
                                            <label forhtml="name" className={styles.label_name}>
                                                <span>Hobbie Name</span>
                                            </label>
                                            <input defaultValue={location.state.name} onChange={e => setInfo({ ...info, name: e.target.value})}  className={styles.h_n} type="text" name="name" />

                                        </div>
                                        {errors.name && <small className={styles.errors_offer}>{errors.name}</small>}
                                    </div>
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_2}>
                                        <div className={styles.name_section}>
                                            <label htmlFor="slogan" className={styles.label_name}>
                                                <span className="">Slogan</span>
                                            </label>
                                            <input defaultValue={location.state.slogan} onChange={e => setInfo({ ...info, slogan: e.target.value})} className={styles.h_n} type="text" name="slogan" />
                                        </div>
                                        {errors.slogan && <small className={styles.errors_offer}>{errors.slogan}</small>}
                                    </div>
                                </div>

                                <div className={styles.offer_row}>
                                    <span>Category</span>
                                    <select onChange={e => setInfo({ ...info, category: e.target.value })} className={styles.custom_select} id="category" name="category">
                                        <option value="">Select category</option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="SOCIAL">Social</option>
                                        <option value="FUN">Fun</option>
                                        <option value="RELAX">Relax</option>
                                        <option value="INTELLECTUAL">Intellectual</option>
                                        <option value="CREATIVE">Creative</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {errors.category && <small className={styles.errors_offer}>{errors.category}</small>}
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_2}>
                                        <div className={styles.name_section}>
                                            <label id="intro" className={styles.label_name}>
                                                <span>Intro</span>
                                            </label>
                                            <textarea defaultValue={location.state.intro}onChange={e => setInfo({ ...info, intro: e.target.value})} className={styles.label_name} type="text" name="intro" ></textarea>
                                        </div>
                                        {errors.intro && <small className={styles.errors_offer}>{errors.intro}</small>}
                                    </div>
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_2}>
                                        <div className={styles.name_section}>
                                            <label id="description" className={styles.label_name}>
                                                <span>Class description</span>
                                            </label>
                                            <textarea defaultValue={location.state.description} onChange={e => setInfo({ ...info, description: e.target.value })} className={styles.label_name} type="text" name="name" ></textarea>
                                        </div>
                                        {errors.description && <small className={styles.errors_offer}>{errors.description}</small>}
                                    </div>
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_2}>
                                        <div className={styles.name_section}>
                                            <label htmlFor="price" className={styles.label_name}>
                                                <span>Price per entry</span>
                                            </label>
                                            <input defaultValue={location.state.price} onChange={e => setInfo({ ...info, price: e.target.value })} className={styles.h_n} type="number" name="price" id="price" />
                                        </div>
                                        {errors.price && <small className={styles.errors_offer}>{errors.price}</small>}
                                    </div>
                                </div>
                                <div className={styles.offer_row}>
                                    <span>Location</span>
                                    <select onChange={e => setInfo({ ...info, location: e.target.value })} className={styles.custom_select} id="location" name="location">
                                        <option value="">Select location</option>
                                        <option value="ZURICH">Zurich</option>
                                        <option value="OTHER">Bern</option>
                                        <option value="OTHER">Zug</option>
                                        <option value="OTHER">Luzern</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {errors.location && <small className={styles.errors_offer}>{errors.location}</small>}
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_photos}>
                                        <div>
                                            <div className={styles.row_upload}>
                                                <label id="photo" className={styles.label_name}>
                                                    <span className="">Gallery</span>
                                                </label>
                                                <div className={styles.button3}>
                                                    <p className={styles.choose_file}> {files.galleryImgUrl1 ?
                                                        "Photo uploaded" : "Choose a file"}</p>
                                                    <input onChange={e => setFiles({ ...files, galleryImgUrl1: e.target.files[0] })} type="file" id="add-title-image" name="img" />
                                                </div>
                                                <div className={styles.button3}>
                                                    <p className={styles.choose_file}> {files.galleryImgUrl2 ?
                                                        "Photo uploaded" : "Choose a file"}</p>
                                                    <input onChange={e => setFiles({ ...files, galleryImgUrl2: e.target.files[0] })} type="file" id="add-title-image" name="img" />
                                                </div>
                                                <div className={styles.button3}>
                                                    <p className={styles.choose_file}> {files.galleryImgUrl3 ?
                                                        "Photo uploaded" : "Choose a file"}</p>
                                                    <input onChange={e => setFiles({ ...files, galleryImgUrl3: e.target.files[0] })} type="file" id="add-title-image" name="img" />
                                                </div>
                                                {/*  <div className={styles.button3}>
                          <p className={styles.choose_file}> {files.galleryImgUrl4 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setFiles({...files, galleryImgUrl4 : e.target.files[0]})} type="file"  id="add-title-image" name="img" />
                        </div>
                        <div className={styles.button3}>
                          <p className={styles.choose_file}> {files.galleryImgUrl5 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setFiles({...files, galleryImgUrl5 : e.target.files[0]})} type="file"  id="add-title-image" name="img" />
                        </div>
                      <div className={styles.button3}>
                          <p className={styles.choose_file}> {files.galleryImgUrl6 ? 
                       "Photo uploaded"  : "Choose a file" }</p>
                            <input onChange={e => setFiles({...files, galleryImgUrl6 : e.target.files[0]})} type="file"  id="add-title-image" name="img" />
                        </div> */}

                                            </div>
                                            {(errors.galleryImgUrl1 || errors.galleryImgUrl2 || errors.galleryImgUrl3) && <div className={styles.errors_offer} >
                                                You must upload at least 3  high quality photos
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.offer_row}>
                                    <div className={styles.form_field_2}>
                                        <div className={styles.name_section}>
                                            <label id="contact" className={styles.label_name}>
                                                <span>Contact info</span>
                                            </label>
                                            <textarea defaultValue={location.state.contactInfo} onChange={e => setInfo({ ...info, contactInfo: e.target.value || e.target.defaultValue })} placeholder="ex: Venue Address, Website, Phone number etc.." className={styles.label_name} type="text" name="contact" ></textarea>
                                        </div>

                                        {errors.contactInfo && <small className={styles.errors_offer}>{errors.contactInfo}</small>}
                                    </div>
                                </div>
                                <button type="submit" className={styles.submit_offer}>Submit</button>
                            </form>
                        </div>
              
                    <FooterDetails />
                    {/* <Background /> */}
                   
                </div>
            </div>

    )
}

export default UpdateOffer



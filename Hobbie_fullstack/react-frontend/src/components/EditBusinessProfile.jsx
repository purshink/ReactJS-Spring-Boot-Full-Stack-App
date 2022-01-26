import React from 'react'
import Footer from './Footer'
import Background from './Background'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UpdateBusinessDataService from '../api/hobby/UpdateBusinessDataService'
import styles from '../css/Forms.module.css'
import { useLocation } from 'react-router-dom';


const EditBusinessProfile = () => {
    let navigate = useNavigate();
    let location = useLocation();

    const [error, setError] = useState(false);
    const [info, setInfo] = useState({
        id: location.state.id,
        businessName: location.state.businessName,
        address: location.state.address,
        password: '',
        repeatpassword: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};

        if (!info.businessName) {
            errors.businessName = "Business name is required"
        } else if (info.businessName.length < 2 || info.businessName.length > 20) {
            errors.businessName = "Text has to be between 2 and 20 characters long"
        }

        if (!info.address) {
            errors.address = "Address is required"
        }

        if (!info.password) {
            errors.password = "A password is required"
        }
        if (!info.repeatpassword) {
            errors.repeatpassword = "Please repeate the password"
        }
        if (info.password !== info.repeatpassword) {
            errors.repeatpassword = "Passwords don't match"
        }

        return errors;
    }




    const submitHandler = async event => {
        event.preventDefault();
        let errors = validate(info)
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log(info)
            const response = await UpdateBusinessDataService(info);
            console.log(response);
            if (response.status !== 201) {
                setError(true)
            } else {
                navigate("/account-business")
            }

        }
        else {
            console.log(errors);
        }
    }


    return (
        <div>
            <div className={styles.form_style}>
                <h2>Edit Business Profile</h2>

                {error && <div className={styles.errors} >
                    This username, business name or email already exist.
                </div>}
                <form onSubmit={submitHandler}>

                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input defaultValue={location.state.businessName} type="text" name="businessName" onChange={e => setInfo({ ...info, businessName: e.target.value })} />
                                <label forhtml="businessName" className={styles.label_name}>
                                    <span className={styles.content_name}>Business Name</span>
                                    {errors.businessName && <small className={styles.errors}>{errors.businessName}</small>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input defaultValue={location.state.address} type="text" name="address" onChange={e => setInfo({ ...info, address: e.target.value })} />
                                <label forhtml="address" className={styles.label_name}>
                                    <span className={styles.content_name}>Address</span>
                                    {errors.address && <small className={styles.errors}>{errors.address}</small>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input type="password" id="password" name="password" onChange={e => setInfo({ ...info, password: e.target.value })} />
                                <label forhtml="password" className={styles.label_name}>
                                    <span className={styles.content_name}>Password</span>
                                    {errors.password && <small className={styles.errors}>{errors.password}</small>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input type="password" name="repeatpassword" id="repeatpassword" onChange={e => setInfo({ ...info, repeatpassword: e.target.value })} />
                                <label forhtml="repeatpassword" className={styles.label_name}>
                                    <span className={styles.content_name}>Repeat Password</span>
                                    {errors.repeatpassword && <small className={styles.errors}>
                                        {errors.repeatpassword}
                                    </small>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.form_field}>
                        <button type="submit" className={styles.button}>Save</button>
                    </div>
                </form>
            </div>
            <Footer />
            <Background />
        </div>
    )
}

export default EditBusinessProfile

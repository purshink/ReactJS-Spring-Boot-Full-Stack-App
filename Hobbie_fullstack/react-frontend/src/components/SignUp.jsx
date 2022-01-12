import React from 'react'
import Footer from './Footer';
import Background from './Background';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SignUpAppClientService from '../api/hobby/SignUpAppClientService';
import styles from '../css/Forms.module.css'





const SignUp = () => {
    let navigate = useNavigate();
    const [checked, setCheckBoxChecked] = useState("other");
    const [error, setError] = useState(false);
    const [info, setInfo] = useState({
        username: '',
        fullName: '',
        gender: '',
        email: '',
        password: '',
        repeatpassword: ''
    });

    const [errors, setErrors] = useState({});


    const validate = () => {
        const errors = {};

        //TODO username or email already exists?

        if (!info.username) {
            errors.username = 'Username is required'
        } else if (info.username.length < 5) {
            errors.username = 'Username must be at least 5 characters long'
        }

        if (!info.fullName) {
            errors.fullName = "Fullname is required"
        } else if (info.fullName.length < 2 || info.fullName.length > 20) {
            errors.fullName = "Text has to be between 2 and 20 characters long"
        }

        if (!info.email) {
            errors.email = 'Email is required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)
        ) {
            errors.email = 'Invalid email address';
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
            const response = await SignUpAppClientService(info);
            console.log(response);
            if (response.status !== 201) {
                setError(true)
            } else {

                navigate("/test")
            }

        }
        else {
            console.log(errors);
        }
    }


    return (
        <div>
            <div className={styles.form_style}>
                <h2>Sign up</h2>
                {error && <div className={styles.errors} >
                    This username or email already exist.
                </div>}

                <form id="userInfo" onSubmit={submitHandler}>
                <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input onChange={e => setInfo({ ...info, username: e.target.value })}
                                    type="text" name="name" />
                                <label id="name" className={styles.label_name}>
                                    <span className={styles.content_name}>Username</span>
                                    {errors.username && <small className={styles.errors}>Invalid Username</small>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input type="text" name="name" onChange={e => setInfo({ ...info, fullName: e.target.value })}
                                />
                                <label htmlFor="name" className={styles.label_name}>
                                    <span className={styles.content_name}>Full Name</span>
                                    {errors.fullName && <small className={styles.errors}>Invalid Full Name</small>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.form_field_radio}>
                            <div className={styles.name_section}>
                                <label id="gender" className={styles.label_name}>
                                    <span className={styles.content_name}>Gender</span>
                                </label>
                            </div>
                            <div className={styles.checkbox_choice_section}>
                                <input onClick={() => setCheckBoxChecked("male")} onChange={e => setInfo({ ...info, gender: "MALE" })}
                                    checked={checked === "male"}
                                    type="checkbox" id="checkbox1" />
                                <label className={styles.checkbox} htmlFor="checkbox1">Male</label>
                                <input onClick={() => setCheckBoxChecked("female")} onChange={e => setInfo({ ...info, gender: "FEMALE" })}
                                    checked={checked === "female"}
                                    type="checkbox" id="checkbox2" />
                                <label className={styles.checkbox} htmlFor="checkbox1">Female</label>
                                <input onClick={() => setCheckBoxChecked("other")} onChange={e => setInfo({ ...info, gender: "OTHER" })}
                                    checked={checked === "other"}
                                    type="checkbox" id="checkbox3" />
                                <label className={styles.checkbox} htmlFor="checkbox1">Other</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input id="email"
                                    name="email"
                                    type="email"
                                    onChange={e => setInfo({ ...info, email: e.target.value })}
                                />
                                <label htmlFor="name" className={styles.label_name}>
                                    <span className={styles.content_name}>Email</span>
                                    {errors.email && <small className={styles.errors}>{errors.email}</small>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={e => setInfo({ ...info, password: e.target.value })}
                                />

                                <label htmlFor="name" className={styles.label_name}>
                                    <span className={styles.content_name}>Password</span>
                                    {errors.password && <small className={styles.errors}>Invalid password</small>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input
                                    id="repassword"
                                    name="repassword"
                                    type="password"
                                    onChange={e => setInfo({ ...info, repeatpassword: e.target.value })}
                                />

                                <label htmlFor="repassword" className={styles.label_name}>
                                    <span className={styles.content_name}>Confirm Password</span>
                                    {errors.repeatpassword && <small className={styles.errors} >{errors.repeatpassword}</small>}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.form_field}>
                        <button id="button" type="submit" className={styles.button}>Sign up</button>
                    </div>
                </form>
            </div>
            <Footer/>
           <Background/>
        </div>
    )

}


export default SignUp

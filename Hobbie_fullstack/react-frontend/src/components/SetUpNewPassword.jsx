

import React from 'react'
import Footer from './Footer'
import Background from './Background'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../css/Forms.module.css'
import UpdatePasswordService from '../api/hobby/UpdatePasswordService'




const SetUpNewPassword = () => {
    let navigate = useNavigate();
    let params = useParams();
    const id = params.id;

    const [errors, setErrors] = useState({});
    const [info, setInfo] = useState({
        password: '',
        repeatpassword: ''
    });



    const validate = () => {
        const errors = {};

        if (!info.password) {
            errors.password = "A password is required"
        }
        if (!info.repeatpassword) {
            errors.repeatpassword = "Repeate password"
        }
        if (info.password !== info.repeatpassword) {
            errors.repeatpassword = "Passwords don't match"
        }

        return errors;
    }


    const updatePassword = async event => {
        event.preventDefault();
        let errors = validate(info)
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log(info)
            const response = await UpdatePasswordService(id, info.password);
            console.log(response);
            if (response.status === 201) {
                navigate("/login")
            }

        }
        else {
            console.log(errors);
        }
       
    }

    return (
        <div>
            <form className={styles.form_style}>
                <div className={styles.login} >

                <div className={styles.loginh1}></div>
                
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
                                {!errors.repeatpassword &&  <span className={styles.content_name}>Confirm Password</span>}
                                    {errors.repeatpassword && <small className={styles.errors} >{errors.repeatpassword}</small>}  
                                </label>
                        
                            </div>
                        </div>
                    </div>
                       
                            <button className={styles.button} onClick={updatePassword}>Submit</button>
                    
                </div>
            </form>
            <Footer />
            <Background />
        </div>
    )
}


export default SetUpNewPassword

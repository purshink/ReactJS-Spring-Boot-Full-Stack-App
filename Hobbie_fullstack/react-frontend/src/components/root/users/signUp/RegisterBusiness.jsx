import React from 'react'
import Footer from '../../fragments/footer/Footer'
import Background from '../../fragments/background/Background'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterBusinessService from '../../../../api/signup/RegisterBusinessService'
import styles from '../../../../css/Forms.module.css';


const RegisterBusiness = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [info, setInfo] = useState({
        username: '',
        businessName: '',
        address: '',
        email: '',
        password: '',
        repeatpassword: ''
    });

    const [errors, setErrors] = useState({});


    const validate = () => {
        const errors = {};


        if (!info.username) {
            errors.username = 'Invalid username'
        } else if (info.username.length < 5) {
            errors.username = 'Minimum 5 char'
        }

        if (!info.businessName) {
            errors.businessName = "Invalid name"
        } else if (info.businessName.length < 2 || info.businessName.length > 20) {
            errors.businessName = "2 to 20 char"
        }

        if (!info.address) {
            errors.address = "Invalid Address"
        }

        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)
        ) {
            errors.email = 'Invalid Email';
        }

        if (!info.password) {
            errors.password = "Invalid Password"
        }
        if (!info.repeatpassword) {
            errors.repeatpassword = "Repeate password"
        }
        if (info.password !== info.repeatpassword) {
            errors.repeatpassword = "Passwords don't match"
        }

        return errors;
    }




    const submitHandler = async event => {
        event.preventDefault();
        const errors = validate(info)
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log(info)
            const response = await RegisterBusinessService(info);
            console.log(response);
            if (response.status !== 201) {
                setError(true)
            } else {
                navigate("/business-owner")
            }

        }
        else {
            console.log(errors);
        }
    }


    return (
        <>
            <main className={styles.form_style}>
                <h2>Register Business</h2>

                {error && <div className={styles.errors} >
                    This username, business name or email already exist.
                </div>}
                <form onSubmit={submitHandler}>

                   
                        <div className={styles.form_field}>
                            <p className={styles.name_section}>
                                <input type="text" name="username" onChange={e => setInfo({ ...info, username: e.target.value })} />
                                <label id="username" className={styles.label_name}>
                                    <span className={styles.content_name}>Username</span>
                                    {errors.username && <small className={styles.errors}>{errors.username}</small>}
                                </label>
                            </p>
                        </div>
            

                 
                        <div className={styles.form_field}>
                            <section className={styles.name_section}>
                                <input type="text" name="businessName" onChange={e => setInfo({ ...info, businessName: e.target.value })} />
                                <label forhtml="businessName" className={styles.label_name}>
                                    <span className={styles.content_name}>Business Name</span>
                                    {errors.businessName && <small className={styles.errors}>{errors.businessName}</small>}
                                </label>
                            </section>
                        </div>
            

                        <div className={styles.form_field}>
                            <section className={styles.name_section}>
                                <input type="text" name="address" onChange={e => setInfo({ ...info, address: e.target.value })} />
                                <label forhtml="address" className={styles.label_name}>
                                    <span className={styles.content_name}>Address</span>
                                    {errors.address && <small className={styles.errors}>{errors.address}</small>}
                                </label>
                            </section>
                        </div>
                 

        
                        <div className={styles.form_field}>
                            <section className={styles.name_section}>
                                <input type="email" name="enail" onChange={e => setInfo({ ...info, email: e.target.value })} />
                                <label forhtml="email" className={styles.label_name}>
                                    <span className={styles.content_name}>Email</span>
                                    {errors.email && <small className={styles.errors}>{errors.email}</small>}
                                </label>
                            </section>
                        </div>
                   
                    
                        <div className={styles.form_field}>
                            <section className={styles.name_section}>
                                <input type="password" id="password" name="password" onChange={e => setInfo({ ...info, password: e.target.value })} />
                                <label forhtml="password" className={styles.label_name}>
                                    <span className={styles.content_name}>Password</span>
                                    {errors.password && <small className={styles.errors}>{errors.password}</small>}
                                </label>
                            </section>
                        </div>
            
                    
                        <div className={styles.form_field}>
                            <section className={styles.name_section}>
                                <input type="password" name="repeatpassword" id="repeatpassword" onChange={e => setInfo({ ...info, repeatpassword: e.target.value })} />
                                <label forhtml="repeatpassword" className={styles.label_name}>
                                {!errors.repeatpassword &&  <span className={styles.content_name}>Repeat Password</span>}
                                    {errors.repeatpassword && <small className={styles.errors}>
                                        {errors.repeatpassword}
                                    </small>}
                                </label>
                            </section>
                        </div>
                

                    <section className={styles.form_field}>
                        <button type="submit" className={styles.button}>Sign up</button>
                    </section>
                </form>
            </main>
            <Footer />
            <Background />
        </>
    )
}

export default RegisterBusiness

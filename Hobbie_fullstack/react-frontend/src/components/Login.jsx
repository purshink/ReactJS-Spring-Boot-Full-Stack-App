

import React from 'react'
import Footer from './Footer'
import Background from './Background'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from '../api/hobby/AuthenticationService'
import LoginService from '../api/hobby/LoginService'
import styles from '../css/Forms.module.css'




const Login = () => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [loginState, setLoginState] = useState({
        hasLoginFailed: false,
        showSuccessMessage: false
    })


    const loginClicked = async event => {
        event.preventDefault();


        const response = await LoginService(credentials.username, credentials.password);
        console.log(response);
        if (response.status !== 200) {
            setLoginState(prevState => ({ ...prevState, hasLoginFailed: true }))
            setLoginState(prevState => ({ ...prevState, showSuccessMessage: false }))
        } else if (response.data === 'USER') {
            AuthenticationService.registerSuccessfulLoginUser(credentials.username)
            navigate("/user-home")

            setLoginState(prevState => ({ ...prevState, hasLoginFailed: false }))
            setLoginState(prevState => ({ ...prevState, showSuccessMessage: true }))
            window.location.reload(false)
        }
        else if (response.data === 'BUSINESS_USER') {
            AuthenticationService.registerSuccessfulLoginBusiness(credentials.username)
            navigate("/business-owner")

            setLoginState(prevState => ({ ...prevState, hasLoginFailed: false }))
            setLoginState(prevState => ({ ...prevState, showSuccessMessage: true }))
            window.location.reload(false)
        }
    }

    return (
        <div>
            <form className={styles.form_style}>
                <div className={styles.loginh1}><h1 >Login</h1></div>
                <div className={styles.login} >
                    <div className={styles.row}>

                        {loginState.hasLoginFailed && <div className={styles.midErrors} > Invalid credentials</div>}
                        {loginState.showSuccessMessage && <div className={styles.midErrors}>Login successful</div>}


                        <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input type="text" name="username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} required />
                                <label id="name" className={styles.label_name}>
                                    <span className={styles.content_name}>Username</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                    <div className={styles.form_field}>
                            <div className={styles.name_section}>
                                <input type="password" name="password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} required />
                                <label htmlFor="password" className={styles.label_name}>
                                    <span className={styles.content_name}>Password</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.form_field}>
                        <button className={styles.button} onClick={loginClicked}>Login</button>
                    </div>
                </div>
            </form>
            <Footer/>
            <Background/>
        </div>
    )
}


export default Login

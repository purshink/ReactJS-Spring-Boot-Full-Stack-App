

import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from '../api/hobby/AuthenticationService'
import LoginService from '../api/hobby/LoginService'




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
            <form className="test">
                <div className="loginh1"><h1 >Login</h1></div>
                <div className="login" >
                    <div className="row">

                        {loginState.hasLoginFailed && <div className="midErrors" > Invalid credentials</div>}
                        {loginState.showSuccessMessage && <div className="midErrors">Login successful</div>}


                        <div className="form-field">
                            <div className="name-section">
                                <input type="text" name="username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} required />
                                <label id="name" className="label-name">
                                    <span className="content-name">Username</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-field">
                            <div className="name-section">
                                <input type="password" name="password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} required />
                                <label htmlFor="password" className="label-name">
                                    <span className="content-name">Password</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-field">
                        <button className="button button2" onClick={loginClicked}>Login</button>
                    </div>
                </div>
            </form>

            <img className="blueImg2" src={blueImg} alt="blueImg"></img>
        </div>
    )
}


export default Login

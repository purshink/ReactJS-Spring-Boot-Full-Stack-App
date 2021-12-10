import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const RegisterBusiness = () => {
    let navigate = useNavigate();


    const [registerState, setRegisterState] = useState({
        userNameOrEmailExist: false,
        invalidUserName: false,
        invalidBusinessName: false,
        invalidAdress: false,
        emtpyGender: false,
        invalidEmail: false,
        invalidPassword: false,
        passwordsDontMatch: false

    });
  

    // new 


   
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
    
        //TODO username or email already exists?

        if (!info.username) {
            errors.username = 'Username is required'
        } else if (info.username.length < 5) {
        errors.username = 'Username must be at least 5 characters long'
        }
    
        if (!info.businessName) {
            errors.businessName = "Business name is required"
        } else if (info.businessName.length < 2 || info.businessName.length > 20) {
            errors.businessName = "Text has to be between 2 and 20 characters long"
        }

        if (!info.address) {
            errors.address = "Address is required"
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
    


  
    const submitHandler= (event) =>{
        event.preventDefault();
        let errors = validate(info)
        setErrors(errors);
        
        if(Object.keys(errors).length === 0){
            console.log(info)
            navigate("/business-owner")
        }
        else {
            console.log(errors);
        }
    }

    
    return (
        <div>
            <div className="test">
    <h2>Register your business</h2>
{/*  
    {registerState.userNameOrEmailExist &&  <div className="errors" >
         This username, business name or email already exist.
     </div>} */}
    <form onSubmit={submitHandler}>

  <div className="row">
  <div className="form-field">
    <div className="name-section">
            <input type="text" name="USERname"onChange={e => setInfo({...info, username : e.target.value})}  />
        <label id="USERname" className="label-name">
            <span className="content-name">Username</span>
            {errors.username  && <small className="errors">{errors.username}</small>} 
        </label>
    </div>
    </div>
    </div>
    <div className="row">
        <div className="form-field">
          <div className="name-section">
              <input type="text" name="businessName" onChange={e => setInfo({...info, businessName : e.target.value})}  />
              <label forhtml="businessName" className="label-name">
                  <span className="content-name">Business Name</span>
                  {errors.businessName&& <small className="errors">{errors.businessName}</small>}
              </label>
          </div>
          </div>
          </div>
          <div className="form-field">
            <div className="name-section">
                <input type="text" name="address" onChange={e => setInfo({...info, address : e.target.value})}  />
                <label forhtml="address" className="label-name">
                    <span className="content-name">Address</span>
                    {errors.address && <small className="errors">{errors.address}</small>}
                </label>
            </div>
            </div>
        
        <div className="row">
            <div className="form-field">
              <div className="name-section">
                  <input  type="email" name="enail" onChange={e => setInfo({...info, email : e.target.value})} />
                  <label forhtml="email" className="label-name">
                      <span className="content-name">Email</span>
                      {errors.email && <small className="errors">{errors.email}</small>}
                  </label>
              </div>
              </div>
              </div>
              <div className="row">
                <div className="form-field">
                  <div className="name-section">
                      <input type="password" id="password" name="password" onChange={e => setInfo({...info, password : e.target.value})} />
                      <label forhtml="password" className="label-name">
                          <span className="content-name">Password</span>
                          {errors.password && <small  className="errors">{errors.password}</small>}
                      </label>
                  </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="form-field">
                      <div className="name-section">
                          <input type="password"  name="repeatpassword" id="repeatpassword" onChange={e => setInfo({...info, repeatpassword : e.target.value})}   />
                          <label forhtml="repeatpassword" className="label-name">
                              <span className="content-name">{errors.repeatpassword}</span>
                              {errors.repeatpassword && <small className="errors" >
        {errors.repeatpassword}
     </small>}
                          </label>
                      </div>
                      </div>
                      </div>
                     
                        <div className="form-field">
                      <button type="submit" className="button button2">Sign up</button>
                        </div>
    </form>

 </div>

<img className="blueImg2" src={blueImg} alt="blueImg2"></img>
        </div>
    )
}

export default RegisterBusiness

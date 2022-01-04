import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import SignUpAppClientService from '../api/hobby/SignUpAppClientService';





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
    


  
    const submitHandler= async event =>{
        event.preventDefault();
        let errors = validate(info)
        setErrors(errors);
        
        if(Object.keys(errors).length === 0){
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
            <div className="test">
    <h2>Sign up</h2>
  {error &&  <div className="errors" >
         This username or email already exist.
     </div>}
    
    <form id="userInfo" onSubmit={submitHandler}> 
  <div className="row">
  <div className="form-field">
    <div className="name-section">
        <input  onChange={e => setInfo({...info, username : e.target.value})} 
        type="text" name="name" />
        <label id="name" className="label-name">
            <span className="content-name">Username</span>
           {errors.username  && <small className="errors">Invalid Username</small>} 
        </label>
    </div>
    </div>
    </div>
    <div className="row">
        <div className="form-field">
          <div className="name-section">
              <input  type="text" name="name" onChange={e => setInfo({...info, fullName : e.target.value})} 
        />
              <label htmlFor="name" className="label-name">
                  <span className="content-name">Full Name</span>
                {errors.fullName && <small className="errors">Invalid Full Name</small>}  
              </label>
          </div>
          </div>
          </div>
        
    <div className="row">
        <div className="form-field-radio">
            <div className="name-section">
            <label id="gender" className="label-name">
                <span className="content-name">Gender</span>
                {/* {signUpState.emtpyGender && <small  className="errors"> Can not be empty</small>} */}
            </label>
        </div>
        <div  className="checkbox-choice-section">
            <input onClick={() =>setCheckBoxChecked("male")} onChange={e => setInfo({...info, gender : "MALE"})} 
        checked={checked === "male"}  
        type="checkbox" id="checkbox1" />
            <label  className="checkbox" htmlFor="checkbox1">Male</label>
            <input onClick={() =>setCheckBoxChecked("female")} onChange={e => setInfo({...info, gender : "FEMALE"})}
        checked={checked === "female"}
                type="checkbox"  id="checkbox2" />
            <label className="checkbox" htmlFor="checkbox1">Female</label>
            <input  onClick={() => setCheckBoxChecked("other")} onChange={e => setInfo({...info, gender : "OTHER"})}
         checked={checked ==="other"}
                type="checkbox"  id="checkbox3"     />
            <label className="checkbox" htmlFor="checkbox1">Other</label>
        </div>
    </div>
        </div>
        <div className="row">
            <div className="form-field">
              <div className="name-section">
              
      <input id="email"
        name="email"
        type="email"
        onChange={e => setInfo({...info, email : e.target.value})} 
        />
                  <label htmlFor="name" className="label-name">
                      <span className="content-name">Email</span>
                     {errors.email && <small className="errors">{errors.email}</small>} 
                  </label>
              </div>
              </div>
              </div>
              <div className="row">
                <div className="form-field">
                  <div className="name-section">
                  <input
        id="password"
        name="password"
        type="password"
        onChange={e => setInfo({...info, password : e.target.value})}
        />
 
                      <label htmlFor="name" className="label-name">
                          <span className="content-name">Password</span>
                         {errors.password && <small  className="errors">Invalid password</small>} 
                      </label>
                  </div>
                  </div>
                  </div>
                  <div className="row">
                    <div className="form-field">
                      <div className="name-section">
                      <input
        id="repassword"
        name="repassword"
        type="password"
        onChange={e => setInfo({...info, repeatpassword : e.target.value})} 
       />
   
                          <label htmlFor="repassword" className="label-name">
                              <span className="content-name">Confirm Password</span>
                                 {errors.repeatpassword  && <small className="errors" >{errors.repeatpassword}</small>}
                          </label>
                      </div>
                      </div>
                      </div>
                     
                        <div className="form-field">
                      <button id="button" type="submit" className="button button2">Sign up</button>
                        </div>
    </form>

 </div>
    <img className="blueImg2" src={blueImg} alt="blueImg2"></img>
        </div>
    )

}

// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { useState } from 'react'
// import * as Yup from 'yup';

// const SignUp = () => {
        
//     const [checked, setCheckBoxChecked] = useState("other");
//   return (
//     <Formik
//       initialValues={{       
//         username: '',
//       fullname: '',
//       gender: '',
//       email: '',
//       password: '',
//       repassword: '' }}
//       validationSchema={Yup.object({
//         username: Yup.string()
//           .max(15, 'Must be 15 characters or less')
//           .required('Required'),
//         fullname: Yup.string()
//           .max(20, 'Must be 20 characters or less')
//           .required('Required'),
//         email: Yup.string().email('Invalid email address').required('Required'),
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >    
//       <Form>
//       <div>
//              <div className="test">
//                 <h2>Sign up</h2>
//      <div id="userInfo">


//                 <div className="row">
//   <div className="form-field">
//     <div className="name-section">
//     <Field name="username" type="text" />
//         <label htmlFor="firstName" className="label-name"><span className="content-name">Username</span>
//         <ErrorMessage class="errors" name="username" /></label>
//     </div>
//     </div>
//     </div>


    

//         <label htmlFor="fullname">Full Name</label>
//         <Field name="fullname" type="text" />
//         <ErrorMessage name="fullname" />

//         <label htmlFor="gender">Gender</label>
//         <Field name="gender" as="select" >   
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//          <option value="other">Other</option>
//         </Field>
//         <ErrorMessage name="gender" />

//         <label htmlFor="email">Email</label>
//         <Field name="email" type="email" />
//         <ErrorMessage name="email" />

//         <label htmlFor="password">Email</label>
//         <Field name="password" type="password" />
//         <ErrorMessage name="password" />

//         <label htmlFor="repassword">Email</label>
//         <Field name="repassword" type="password" />
//         <ErrorMessage name="repassword" />


//         <button type="submit">Submit</button>
//         </div>
//     </div>
//   </div>
//       </Form>
//     </Formik>
//   );
// };


export default SignUp

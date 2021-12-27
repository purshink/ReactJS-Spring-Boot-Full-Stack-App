import React from 'react'
import axios from 'axios'

const SignUpAppClientService = (user) => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };

    return (
   
        axios.post(`http://localhost:8080/users/signup`, user, axiosConfig)
             .then(res => {
                 if(res.data != null){
                  // () => res.redirect('/user-home')
                    return res;
                 }
               }) .catch(err => {
                 return err.response;
               }));
}

export default SignUpAppClientService

import React from 'react'
import axios from 'axios';


const RegisterBusinessService = (user) => {

  let username = 'user';
  let password = '123';
  let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',

            'Authorization' : basicAuthHeader,
        }
      };

    return (
   
        axios.post(`http://localhost:8080/users/register-business`, user,axiosConfig)
             .then(res => {
                 if(res.data != null){
                  // () => res.redirect('/user-home')
                    return res;
                 }
               }) .catch(err => {
                let error = '';

                if(err.response){
                  error += err.response;
                }
                return error;
               }));
}

export default RegisterBusinessService

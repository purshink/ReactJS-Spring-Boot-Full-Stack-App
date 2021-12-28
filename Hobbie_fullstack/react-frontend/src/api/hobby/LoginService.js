import axios from 'axios';
import React from 'react'


const LoginService = (username, password) => {
    return (
   
        axios.post(`http://localhost:8080/users/login`, null, { params: {
            username,
            password
          }})
             .then(res => {
                 if(res != null){
                     console.log(res);
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

export default LoginService

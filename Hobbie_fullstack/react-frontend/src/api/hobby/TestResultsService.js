import React from 'react'
import axios from 'axios'





const TestResultsService = (test) => {
  let username = 'user';
  let password = '123';
  let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
 
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization' : basicAuthHeader,
      // "Access-Control-Allow-Origin": "https://localhost:8080/users/signup",

    }
  };

    return (
   
    
        axios.post(`http://localhost:8080/test/results`, test, axiosConfig)
             .then(res => {
                 if(res.data != null){
                  // () => res.redirect('/user-home')
                  //  alert("Thank you!")
                 }
               }).catch(err => {
                let error = '';

                if(err.response){
                  error += err.response;
                }
                return error;
               }));
    
}

export default TestResultsService

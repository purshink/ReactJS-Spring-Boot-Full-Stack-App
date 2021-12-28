import React from 'react'
import axios from 'axios'
import AuthenticationService from './AuthenticationService';


const HobbyDataService = () => {
    let username = AuthenticationService.getLoggedInUser();

let username1 = 'user';
let password = '123';
let basicAuthHeader = 'Basic ' + window.btoa(username1 + ":" + password);
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization' : basicAuthHeader,
      }
    };  

         return (
     
            axios.get(`http://localhost:8080/user-home/${username}`,axiosConfig)
         )


}

export default HobbyDataService

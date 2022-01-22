import React from 'react';
import axios from 'axios'
import AuthenticationService from './AuthenticationService';

const UserDataService = () => {
    let username = AuthenticationService.getLoggedInUser();
    let password = '123';
    let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': basicAuthHeader,
        }
    };

  return    axios.get(`http://localhost:8080/users/show-client-details/${username}`, axiosConfig);

};

export default UserDataService;

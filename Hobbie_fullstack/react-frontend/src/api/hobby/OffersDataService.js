
import axios from 'axios'

import AuthenticationService from './AuthenticationService';

let username = 'user';
let password = '123';
let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);

const OffersDataService = () => {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            
            'Authorization' : basicAuthHeader,
        }
      };
    let username = AuthenticationService.getLoggedInUser();
        return (
     
            axios.get(`http://localhost:8080/business-owner/${username}`, axiosConfig)
        )
   

}

export default OffersDataService
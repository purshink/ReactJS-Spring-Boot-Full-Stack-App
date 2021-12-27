import React from 'react'
import axios from 'axios'
import AuthenticationService from './AuthenticationService';

const HobbyDataService = () => {
    let username = AuthenticationService.getLoggedInUser();


         return (
     
            axios.get(`http://localhost:8080/user-home/${username}`)
         )


}

export default HobbyDataService

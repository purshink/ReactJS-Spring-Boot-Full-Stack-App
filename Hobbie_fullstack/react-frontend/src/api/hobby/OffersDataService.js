import React from 'react'
import axios from 'axios'
import AuthenticationService  from '../../components/AuthenticationService'

const OffersDataService = () => {
    let username = AuthenticationService.getLoggedInUser();
        return (
     
            axios.get(`http://localhost:8080/business-owner/${username}`)
        )
   

}

export default OffersDataService
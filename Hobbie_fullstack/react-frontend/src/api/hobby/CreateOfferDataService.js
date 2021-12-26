import React from 'react'
import axios from 'axios'


const CreateOfferDataService = (info,img_urls) => {
  
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
    
        return (
       
            axios.post(`http://localhost:8080/hobbies/create-offer`, info, axiosConfig)
                 .then(res => {
                     if(res.data != null){
                      // () => res.redirect('/user-home')
                       alert("Thank you!")
                     }
                   }).catch(err => {
                     console.log(err.response);
                   }));
    
}

export default CreateOfferDataService

import React from 'react';
import axios from 'axios';

const UpdateOfferDataService = (hobby) => {
    return (

        axios.post(`http://localhost:8080/hobbies/update-hobby`, hobby)
          .then(res => {
            if (res.data != null) {
              // () => res.redirect('/user-home')
              return res;
            }
          }).catch(err => {
            let error = '';
    
            if (err.response) {
              error += err.response;
            }
            return error;
          }));
};

export default UpdateOfferDataService;

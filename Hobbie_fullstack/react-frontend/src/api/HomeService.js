import React from 'react'
import axios from 'axios'

const HomeService = () => {

    return (
        axios.get('http://localhost:8080/')
        .then(res => {
            if (res.data != null) {
              return res;
            }
          }).catch(err => {
            let error = '';
        
            if (err.response) {
              error += err.response;
            }
            return error;
          }));
}

export default HomeService

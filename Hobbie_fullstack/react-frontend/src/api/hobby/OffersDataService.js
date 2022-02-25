
import axios from '../customAxiosConfig/CustomAxiosConfig';
import AuthenticationService from '../authentication/AuthenticationService';


const OffersDataService = () => {
    let username = AuthenticationService.getLoggedInUser();

    return (

         axios.get(`http://localhost:8080/business-owner/${username}`)
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

export default OffersDataService
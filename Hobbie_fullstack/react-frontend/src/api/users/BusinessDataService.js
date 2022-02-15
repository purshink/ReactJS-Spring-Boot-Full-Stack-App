import axios from '../customAxiosConfig/CustomAxiosConfig';
import AuthenticationService from '../authentication/AuthenticationService';

const BusinessDataService = () => {
    let username = AuthenticationService.getLoggedInUser();
 

  return    axios.get(`http://localhost:8080/users/show-business-details/${username}`);

};

export default BusinessDataService;

import AuthenticationService from '../authentication/AuthenticationService';
import axios from '../customAxiosConfig/CustomAxiosConfig';

const HobbyDataService = () => {
    let username = AuthenticationService.getLoggedInUser();

        try {
          return  axios.get(`http://localhost:8080/user-home/${username}`)
          } catch (err) {
            let error = '';
            if (err.response) {
                error += err.response;
              }
              return error;
          }

}

export default HobbyDataService

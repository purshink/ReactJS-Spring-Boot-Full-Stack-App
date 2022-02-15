import axios from '../customAxiosConfig/CustomAxiosConfig';
import AuthenticationService from '../authentication/AuthenticationService';

const UserDataService = () => {
    let username = AuthenticationService.getLoggedInUser();

    return axios.get(`http://localhost:8080/users/show-client-details/${username}`);

};

export default UserDataService;

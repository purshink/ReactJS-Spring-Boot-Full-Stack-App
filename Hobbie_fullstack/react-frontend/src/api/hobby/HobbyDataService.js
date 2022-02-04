import AuthenticationService from './AuthenticationService';
import axios from './CustomAxiosConfig';

const HobbyDataService = () => {
    let username = AuthenticationService.getLoggedInUser();

    return (

        axios.get(`http://localhost:8080/user-home/${username}`)
    )


}

export default HobbyDataService

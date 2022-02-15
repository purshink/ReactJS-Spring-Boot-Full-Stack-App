import AuthenticationService from '../authentication/AuthenticationService';
import axios from '../customAxiosConfig/CustomAxiosConfig';

const HobbyDataService = () => {
    let username = AuthenticationService.getLoggedInUser();

    return (

        axios.get(`http://localhost:8080/user-home/${username}`)
    )


}

export default HobbyDataService

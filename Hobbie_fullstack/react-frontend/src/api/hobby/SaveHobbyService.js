import axios from '../customAxiosConfig/CustomAxiosConfig';
import AuthenticationService from '../authentication/AuthenticationService';

const SaveHobbyService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  try {
   return ( axios.get(`http://localhost:8080/hobbies/save-hobby`,{
      params: {
        id,
        username
      }
    } ))
  } catch (err) {
    let error = '';
    if (err.response) {
      error += err.response;
    }
    return error;
  }
}


export default SaveHobbyService
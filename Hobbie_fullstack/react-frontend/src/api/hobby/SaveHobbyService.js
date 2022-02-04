import axios from './CustomAxiosConfig';
import AuthenticationService from './AuthenticationService';

const SaveHobbyService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  return   ( axios.get(`http://localhost:8080/hobbies/save-hobby`,{
    params: {
      id,
      username
    }
  } )
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

export default SaveHobbyService
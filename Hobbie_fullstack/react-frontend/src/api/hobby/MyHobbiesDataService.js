import axios from './CustomAxiosConfig';
import AuthenticationService from './AuthenticationService';

const MyHobbiesDataService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  return   ( axios.get(`http://localhost:8080/hobbies/saved-hobbies/${username}` )
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

export default MyHobbiesDataService
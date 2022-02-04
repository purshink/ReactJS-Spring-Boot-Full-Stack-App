import axios from './CustomAxiosConfig';
import AuthenticationService from './AuthenticationService';

const DeleteUserService = (id) => {
  return (
    axios.delete(`http://localhost:8080/users/delete-user/${id}`)
      .then(res => {
        if (res.data != null) {
          AuthenticationService.logout();
          return res;
        }
      }).catch(err => {
        let error = '';

        if (err.response) {
          error += err.response;
        }
        return error;
      }));
};

export default DeleteUserService;

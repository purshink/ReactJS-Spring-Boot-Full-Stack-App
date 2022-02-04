import axios from './CustomAxiosConfig';

const UpdateUserDataService = (user) => {

  return (

     axios.post(`http://localhost:8080/users/update-user`, user)
      .then(res => {
        if (res.data != null) {
          // () => res.redirect('/user-home')
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

export default UpdateUserDataService

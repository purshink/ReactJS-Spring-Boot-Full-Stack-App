import axios from './CustomAxiosConfig';

const RegisterBusinessService = (user) => {

  return (

    axios.post(`http://localhost:8080/users/register-business`, user)
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

export default RegisterBusinessService

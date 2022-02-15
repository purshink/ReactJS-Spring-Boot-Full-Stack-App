import axios from '../customAxiosConfig/CustomAxiosConfig';

const SignUpAppClientService = (user) => {

  return (

    axios.post(`http://localhost:8080/users/signup`, user)
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

export default SignUpAppClientService

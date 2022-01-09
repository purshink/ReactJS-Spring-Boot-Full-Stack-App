import axios from 'axios';



const LoginService = (username, password) => {
  return (

    axios.post(`http://localhost:8080/users/login`, null, {
      params: {
        username,
        password
      }
    })
      .then(res => {
        if (res != null) {
          console.log(res);
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

export default LoginService

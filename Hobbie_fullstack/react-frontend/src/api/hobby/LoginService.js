import axios from './CustomAxiosConfig';

const LoginService = (username) => {

//   let axiosConfig = { headers: {

//     'Accept' : 'application/json',  
//     "Content-Type": "application/json",
//     'Access-Control-Allow-Methods': "*",
//     "Access-Control-Allow-Origin": "*",
//     'Authorization': token
// }}

// console.log(axiosConfig)

  return (
    axios.post(`http://localhost:8080/users/login/${username}`)
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

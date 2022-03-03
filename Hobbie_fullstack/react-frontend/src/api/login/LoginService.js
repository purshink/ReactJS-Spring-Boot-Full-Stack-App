import axios from "../customAxiosConfig/CustomAxiosConfig";

const LoginService = (username) => {
  try {
    return axios.post(`http://localhost:8080/users/login/${username}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default LoginService;

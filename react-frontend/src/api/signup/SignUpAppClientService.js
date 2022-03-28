import axios from "../customAxiosConfig/CustomAxiosConfig";

const SignUpAppClientService = (user) => {
  try {
    return axios.post(`http://localhost:8080/signup`, user);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default SignUpAppClientService;

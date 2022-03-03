import axios from "../customAxiosConfig/CustomAxiosConfig";

const SignUpAppClientService = (user) => {
  return axios.post(`http://localhost:8080/users/signup`, user);
};

export default SignUpAppClientService;

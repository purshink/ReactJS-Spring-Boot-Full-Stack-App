import axios from "../customAxiosConfig/CustomAxiosConfig";

const RegisterBusinessService = (user) => {
  return axios.post(`http://localhost:8080/users/register-business`, user);
};

export default RegisterBusinessService;

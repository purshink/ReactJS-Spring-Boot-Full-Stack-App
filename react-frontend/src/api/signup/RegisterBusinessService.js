import axios from "../customAxiosConfig/CustomAxiosConfig";

const RegisterBusinessService = (business) => {
  try {
    return axios.post(`http://localhost:8080/register`, business);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default RegisterBusinessService;

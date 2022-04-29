import axios from "../customAxiosConfig/CustomAxiosConfig";

const RegisterBusinessService = (business) => {
  try {
    return axios.post(`/register`, business);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default RegisterBusinessService;

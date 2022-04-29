import axios from "../customAxiosConfig/CustomAxiosConfig";

const LoginService = (username) => {
  try {
    return axios.post(`/login`, null, {
      params: {
        username,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default LoginService;

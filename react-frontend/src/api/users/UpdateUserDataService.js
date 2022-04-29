import axios from "../customAxiosConfig/CustomAxiosConfig";

const UpdateUserDataService = (user) => {
  try {
    return axios.put(`/user`, user);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default UpdateUserDataService;

import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const DeleteUserService = (id) => {
  try {
    const res = axios.delete(`http://localhost:8080/users/delete-user/${id}`);

    return res;
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default DeleteUserService;

import axios from "../customAxiosConfig/CustomAxiosConfig";

const DeleteUserService = (id) => {
  try {
    const res = axios.delete(`/user/${id}`);

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

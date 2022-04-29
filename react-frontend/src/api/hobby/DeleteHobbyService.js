import axios from "../customAxiosConfig/CustomAxiosConfig";

const DeleteHobbyService = (id) => {
  try {
    return axios.delete(`/hobbies/${id}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default DeleteHobbyService;

import axios from "../customAxiosConfig/CustomAxiosConfig";

const DeleteHobbyService = (id) => {
  try {
    return axios.delete(`http://localhost:8080/hobbies/${id}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default DeleteHobbyService;

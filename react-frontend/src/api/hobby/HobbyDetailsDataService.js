import axios from "../customAxiosConfig/CustomAxiosConfig";

const HobbyDetailsDataService = (id) => {
  try {
    return axios.get(`http://localhost:8080/hobbies/${id}`);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default HobbyDetailsDataService;

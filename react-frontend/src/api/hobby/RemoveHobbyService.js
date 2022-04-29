import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const RemoveHobbyService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  try {
    return axios.delete(`/hobbies/remove`, {
      params: {
        id,
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

export default RemoveHobbyService;

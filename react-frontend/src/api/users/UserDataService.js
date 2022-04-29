import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const UserDataService = () => {
  let username = AuthenticationService.getLoggedInUser();

  try {
    return axios.get(`/client`, {
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

export default UserDataService;

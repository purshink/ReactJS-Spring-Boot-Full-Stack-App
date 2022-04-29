import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const MyHobbiesDataService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  try {
    return axios.get(`/hobbies/saved/`, {
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

export default MyHobbiesDataService;

import axios from "axios";

const UserEmailDataService = async (email) => {
  try {
    return axios.post(`http://localhost:8080/notification`, email);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default UserEmailDataService;

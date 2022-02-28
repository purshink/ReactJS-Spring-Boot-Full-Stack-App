import axios from '../customAxiosConfig/CustomAxiosConfig';

const UpdateBusinessDataService = (business) => {
  try {
    return axios.post(`http://localhost:8080/users/update-business`, business)

  } catch (err) {
    let error = '';
    if (err.response) {
      error += err.response;
    }
    return error;
  }
}

export default UpdateBusinessDataService
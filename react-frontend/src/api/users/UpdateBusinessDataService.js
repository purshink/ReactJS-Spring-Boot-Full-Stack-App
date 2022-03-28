import axios from "../customAxiosConfig/CustomAxiosConfig";

const UpdateBusinessDataService = (business) => {
  return axios.put(`http://localhost:8080/business`, business);
};
export default UpdateBusinessDataService;

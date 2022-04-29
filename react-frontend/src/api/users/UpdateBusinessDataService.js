import axios from "../customAxiosConfig/CustomAxiosConfig";

const UpdateBusinessDataService = (business) => {
  return axios.put(`/business`, business);
};
export default UpdateBusinessDataService;

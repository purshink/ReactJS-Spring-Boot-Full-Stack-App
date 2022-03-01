import axios from '../customAxiosConfig/CustomAxiosConfig';

const UpdateBusinessDataService = (business) => {
 
    return axios.post(`http://localhost:8080/users/update-business`, business)


}
export default UpdateBusinessDataService
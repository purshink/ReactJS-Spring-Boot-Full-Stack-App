import axios from '../customAxiosConfig/CustomAxiosConfig';

const CreateOfferDataService = (info) => {


  return axios.post(`http://localhost:8080/hobbies/create-offer`, info)

}

export default CreateOfferDataService

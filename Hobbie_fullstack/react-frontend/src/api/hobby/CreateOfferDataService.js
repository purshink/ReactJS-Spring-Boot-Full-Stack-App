import axios from '../customAxiosConfig/CustomAxiosConfig';

const CreateOfferDataService = (info) => {

  try {
    return  axios.post(`http://localhost:8080/hobbies/create-offer`, info)
    } catch (err) {
      let error = '';
      if (err.response) {
          error += err.response;
        }
        return error;
    }


}

export default CreateOfferDataService

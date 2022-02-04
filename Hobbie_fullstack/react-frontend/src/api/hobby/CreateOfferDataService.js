import axios from './CustomAxiosConfig';

const CreateOfferDataService = (info) => {


  return (

    axios.post(`http://localhost:8080/hobbies/create-offer`, info)
      .then(res => {
        if (res.data != null) {
          window.location.href='/business-owner'; 
        }
      }).catch(err => {
        let error = '';

        if (err.response) {
          error += err.response;
        }
        return error;
      }));

}

export default CreateOfferDataService

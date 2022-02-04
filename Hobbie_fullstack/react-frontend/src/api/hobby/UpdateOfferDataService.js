import axios from './CustomAxiosConfig';

const UpdateOfferDataService = async (hobby) => {
  
  
    return (

        await axios.post(`http://localhost:8080/hobbies/update-hobby`, hobby)
          .then(res => {
          
            if (res.data != null) {
              window.location.href='/offer/'+ hobby.id; 
            }
          }).catch(err => {
            let error = '';
    
            if (err.response) {
              error += err.response;
            }
            return error;
          }));
};

export default UpdateOfferDataService;

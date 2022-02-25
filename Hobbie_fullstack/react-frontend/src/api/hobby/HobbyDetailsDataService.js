import axios from '../customAxiosConfig/CustomAxiosConfig';

const HobbyDetailsDataService = (id) => {
   
    return (
        axios.get(`http://localhost:8080/hobbies/hobbie-details/${id}`)
        .then(res => {
            if (res.data != null) {
              return res;
            }
          }).catch(err => {
            let error = '';
        
            if (err.response) {
              error += err.response;
            }
            return error;
          }));
}

export default HobbyDetailsDataService

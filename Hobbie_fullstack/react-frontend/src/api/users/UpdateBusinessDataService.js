import axios from '../customAxiosConfig/CustomAxiosConfig';

const UpdateBusinessDataService = (business) => {


  return (

    axios.post(`http://localhost:8080/users/update-business`, business)
      .then(res => {
        if (res.data != null) {
          // () => res.redirect('/user-home')
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

export default UpdateBusinessDataService
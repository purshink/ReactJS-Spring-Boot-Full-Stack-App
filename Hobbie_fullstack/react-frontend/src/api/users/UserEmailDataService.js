import axios from 'axios';


const UserEmailDataService = async (email) => {
    console.log(email);

    return axios.post(`http://localhost:8080/users/change-password`,email).then(res => {
      console.log(res);
        if (res.data != null) {
   
          return res;
        }
      }).catch(err => {
        let error = '';
     
        if (err.response) {
          error += err.response;
        }
        return error;
      });

};

export default UserEmailDataService;

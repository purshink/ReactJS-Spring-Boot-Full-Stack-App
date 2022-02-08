import axios from 'axios';

const UpdatePasswordService = (id, password) => {
  console.log(id, password)
  return (
     axios.post(`http://localhost:8080/users/change-password-new`, null, { params: {
      id,
      password
    }})
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

export default UpdatePasswordService

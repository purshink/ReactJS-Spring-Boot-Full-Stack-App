import axios from "axios";

const DeleteHobbyService = (id) => {

  return   ( axios.delete(`http://localhost:8080/hobbies/delete-hobby/${id}`)
  .then(res => {
    if (res.data != null) {
      if (res.data != null) {
        window.location.href='/business-owner'; 
      }
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

export default DeleteHobbyService

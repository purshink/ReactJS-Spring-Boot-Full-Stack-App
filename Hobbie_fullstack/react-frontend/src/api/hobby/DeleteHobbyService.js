import axios from "axios";

const DeleteHobbyService = (id) => {

  let username = 'user';
  let password = '123';
  let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      'Authorization': basicAuthHeader,
    }
  };

  axios.delete(`http://localhost:8080/remove-hobby/:id`, id, axiosConfig).then(res => {
    if (res.data != null) {
      // () => res.redirect('/user-home')
      //  alert("Thank you!")
    }
  }).catch(err => {
    let error = '';

    if (err.response) {
      error += err.response;
    }
    return error;
  });
}

export default DeleteHobbyService

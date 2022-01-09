
import axios from 'axios'



const CreateOfferDataService = (info) => {
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

  return (

    axios.post(`http://localhost:8080/hobbies/create-offer`, info, axiosConfig)
      .then(res => {
        if (res.data != null) {
          // () => res.redirect('/user-home')
          alert("Thank you!")
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

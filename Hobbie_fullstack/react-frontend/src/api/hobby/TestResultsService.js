import axios from './CustomAxiosConfig';

const TestResultsService = (test) => {

  return (


    axios.post(`http://localhost:8080/test/results`, test)
      .then(res => {
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
      }));

}

export default TestResultsService

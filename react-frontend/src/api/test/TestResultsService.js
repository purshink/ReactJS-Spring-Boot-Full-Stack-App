import axios from "../customAxiosConfig/CustomAxiosConfig";

const TestResultsService = (test) => {
  try {
    return axios.post(`/test`, test);
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default TestResultsService;

import axios from './CustomAxiosConfig';

const HobbyDetailsDataService = (id) => {
   
    return (
        axios.get(`http://localhost:8080/hobbies/hobbie-details/${id}`)

    )
}

export default HobbyDetailsDataService

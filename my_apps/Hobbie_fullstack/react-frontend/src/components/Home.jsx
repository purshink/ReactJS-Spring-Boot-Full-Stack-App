import React from 'react'
import Presentation from './Presentation'
import cover from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/coverImg.png'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import HomeService from '../api/HomeService'
import { useState } from 'react'




const Home = () => {
    const [state, setState] = useState({
        backendMessage: ''
    })
    
    const retriveBackendMesage = () =>{
        HomeService()
        .then(response => handleSuccessfulResponse(response))
        // .catch()
    }
    
    const handleSuccessfulResponse = (response) =>{
        setState({backendMessage: response.data})
    }
    
    return (
        
        <div className="main">
            {/* <div className="cta" >
        
        <button  className="cta_second" onClick={retriveBackendMesage}> 
        Tack to backend
        </button>

            </div>

            <div className="cta" >
                <p>{state.backendMessage}</p>

            </div> */}
<Presentation/>

<footer className="footer bg-transparent  py-2">
        <div className="container-fluid text-center">
            <div className="footer-background h5 text-white">
                &copy; Hobbie 2021. All rights reserved.
            </div>
        </div>
        </footer>
<img className="drawing" src={cover} alt="coverImg"/>
<img className="blueImg" src={blueImg} alt="blueImg"/>
        </div>
    )
}



export default Home

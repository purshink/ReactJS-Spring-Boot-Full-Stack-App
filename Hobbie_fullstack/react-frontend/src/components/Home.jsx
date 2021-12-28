import React from 'react'
import Presentation from './Presentation'
import cover from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/coverImg.png'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'





const Home = () => {

    
    return (
        
        <div className="main">

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

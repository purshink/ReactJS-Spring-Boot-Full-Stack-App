import React from 'react'
import Presentation from './Presentation'
import cover from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/coverImg.png'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'





const Home = () => {


    return (
        <div>
            <Presentation />
            <footer className="footer">
                &copy; Hobbie 2021. All rights reserved.
            </footer>
            <img className="drawing" src={cover} alt="coverImg" />
            <img className="blueImg" src={blueImg} alt="blueImg" />
        </div>
    )
}



export default Home

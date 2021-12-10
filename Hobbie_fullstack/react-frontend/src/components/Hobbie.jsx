import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import hikingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/1.jpg'

import Footer from './Footer'

const Hobbie = () => {
    return (

        
   <div className="hobbie-main" >
    <div className="hobbie-container">
    
        <div className="hobbie-content">
        <div className="hobbie-cover"  >
<img className="hobbie-cover" src={hikingImg} alt="hiking"/></div>
            <div className="hobbie-content-body">
                <div className="hobbie-pages">
                    <span className="hobbie-active"><b>01</b></span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                </div>
                <div className="hobbie-lable">
                    <span className="hobbie-title"><b>Title</b></span>
                    <p >
                        Bouldering at an indoors bouldering centre in Pasila, Helsinki, Finland
                        Climbing activities include:
                        Bouldering: Ascending boulders or small outcrops, often with climbing shoes and a chalk bag or bucket. Usually, instead of using a safety rope from above, injury is avoided using a crash pad and a human spotter (to direct a falling climber on to the pad. They can also give beta, or advice)[2]
                        Buildering: Ascending the exterior skeletons of buildings, typically without protective equipment.
                        Canyoneering: Climbing along canyons for sport or recreation.
                        Chalk climbing: Ascending chalk cliffs uses some of the same techniques as ice climbing.
                        Competition climbing: A formal, competitive sport of recent origins, normally practiced on artificial walls that resemble natural formations. The International Federation of Sport Climbing (IFSC) is the official organization governing competition rock climbing worldwide and is recognized by the IOC and GAISF and is a member of the International World Games Association (IWGA). The UIAA is the official organization governing competition ice climbing worldwide. Competition climbing has three major disciplines: Lead, Bouldering and Speed.

                        Pole climbing: Climbing poles and masts without equipment. </p>
                    <div className="prix">
            

                       
                            <span ><a  className="add-crt-edit">Remove</a></span>
                            <span ><a className="add-crt-edit" >Save</a></span>
                      
                    </div>

                </div>
            </div>
        </div>
        </div>
       


<img class="blueImg3" src={blueImg} alt="blueImg"/>
<img class="blueImg4" src={blueImg} alt="blueImg"/>
<footer className="footer-hobbie bg-transparent  py-2">
        <div className="container-fluid text-center">
            <div className="footer-background h5 text-white">
                &copy; Hobbie 2021. All rights reserved.
            </div>
        </div>
        </footer>

        </div>
     
    )
}

export default Hobbie

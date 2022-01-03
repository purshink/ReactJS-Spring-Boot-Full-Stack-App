import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import hikingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/1.jpg'
import { useState, useLayoutEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import HobbyDetailsDataService from '../api/hobby/HobbyDetailsDataService'
import { useLocation } from 'react-router-dom'



const Hobbie = (props) => {
    let navigate = useNavigate();
    let params = useParams();

    const id  = params.id;
  
    const [hobby, setHobby] = useState({name: '',
    slogan: '',
    intro: '',
    description: '',
    price: '',
    profileImgUrl : '',
    galleryImgUrl1: '',
    galleryImgUrl2: '',
    galleryImgUrl3: '',
    contactInfo: ''
})

    const [welcomeDiv, setWelcomeDiv] = useState({showDiv: false})
    

    
    useLayoutEffect(() => {
        let unmounted = false;

        // Update the document using the browser API
      
        HobbyDetailsDataService(id).then(
            response => {
                if(!unmounted){
                    setHobby(response.data);
                    setWelcomeDiv({showDiv:false})
             
                }
                if (!Object.keys(response.data).length){
                    setWelcomeDiv({showDiv:true})
                }
                 })
                 return () => { unmounted = true  };
                 
                }, []);
    

    return (

        
   <div className="hobbie-main" >
    <div className="hobbie-container">
    
    {hobby !== undefined && <div className="hobbie-content">
        <div className="hobbie-cover"  >
            <img className="hobbie-cover" src={hobby.profileImgUrl} alt="hiking"/></div>
             <div className="hobbie-content-body">
                <div className="hobbie-pages">
                    <span className="hobbie-active"><b>01</b></span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                </div>
                <div className="hobbie-lable">
                    <span className="hobbie-title"><b>{hobby.name}</b></span>
                    <p >
                      {hobby.description} </p>
                    <div className="prix">
            

                       
                            <span ><a  className="add-crt-edit">Remove</a></span>
                            <span ><a className="add-crt-edit" >Save</a></span>
                      
                    </div>

                </div>
            </div>
        </div>}
        </div> 
       
        { welcomeDiv.showDiv && <div>
                     <div className="introduction-home">
                      <div className="intro-text">
                      <p> This hobby does not exist.</p>
                         </div>
                     </div>
            
                 </div>}

<img className="blueImg3" src={blueImg} alt="blueImg"/>
<img className="blueImg4" src={blueImg} alt="blueImg"/>
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

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
    const [currentPage, setCurrentPage] = useState('01');
  
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
    
               const changePage =(page)=> {
                   setCurrentPage(page);
                }
    

    return (

        
   <div className="hobbie-main" >
    <div className="hobbie-container">
    
    {hobby !== undefined && <div className="hobbie-content">
      {currentPage !== '03' &&  <div className="hobbie-cover"  >
            <img className="hobbie-cover" src={hobby.profileImgUrl} alt="hiking"/></div>}
             <div className="hobbie-content-body">
                <div className="hobbie-pages">
                    <span onClick={() =>changePage('01')} className={currentPage === '01' ? "hobbie-active" : ""} >01</span>
                    <span onClick={() =>changePage('02')} className={currentPage === '02' ? "hobbie-active" : ""}>02</span>
                    <span onClick={() =>changePage('03')} className={currentPage === '03' ? "hobbie-active" : ""}>03</span>
                    <span onClick={() =>changePage('04')} className={currentPage === '04' ? "hobbie-active" : ""}>04</span>
                </div>
               <div className="hobbie-lable">
              
               <span className="hobbie-title"><b>{hobby.name}</b></span>
               <h4 className='slogan'> {hobby.slogan} </h4>
               {currentPage === '01'&& <div>
                    
                   <p> {hobby.intro} </p>
                   </div>}
                   {currentPage === '02'&& <div>
                   <p> {hobby.description} </p>
                   </div>}
                   {currentPage === '03'&& 
                    <div class="gallery">
                        <img  src={hobby.galleryImgUrl1}className="gallery__photo gallery__photo--1" alt="photo-1"/>
                        <img  src={hobby.galleryImgUrl2}className="gallery__photo gallery__photo--2" alt="photo-2"/>
                        <img  src={hobby.galleryImgUrl3}className="gallery__photo gallery__photo--3" alt="photo-3"/>
                        <img  src={hobby.galleryImgUrl1}className="gallery__photo gallery__photo--4" alt="photo-1"/>
                        <img  src={hobby.galleryImgUrl2}className="gallery__photo gallery__photo--5" alt="photo-2"/>
                       
                    </div>

                  }
                   
                   {currentPage === '04'&& <div>
                   
                   <p> {hobby.contactInfo} </p>
                   </div>}
                   {currentPage !== '03' && <div className="prix">
                            <span ><a  className="add-crt-edit">Remove</a></span>
                            <span ><a className="add-crt-edit" >Save</a></span>
                    </div>} 
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
<footer className="footer-hobbie-details">
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

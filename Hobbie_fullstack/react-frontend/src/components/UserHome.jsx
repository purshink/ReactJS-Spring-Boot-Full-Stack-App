import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import hikingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/1.jpg'
import ImgTwo from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import ImgThree from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/3.jpg'
import ImgFour from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/4.jpg'
import ImgFive from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/5.jpg'
import ImgSix from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/6.jpg'
import HobbyDataService from '../api/hobby/HobbyDataService'
import { useState, useLayoutEffect} from 'react'

const UserHome = () => {
    let key = 1;
    const [state, setState] = useState({
        hobbies: []
    })

    const [welcomeDiv, setWelcomeDiv] = useState({showDiv: false})


    
    useLayoutEffect(() => {
        let unmounted = false;

        // Update the document using the browser API
      
        HobbyDataService().then(
            response => {
                if(!unmounted){
                    setState(response.data);
                    setWelcomeDiv({showDiv:false})
                }
                if (!Object.keys(response.data).length){
                    setWelcomeDiv({showDiv:true})
                }
                 })
                 return () => { unmounted = true  };
                 
                }, []);
    
                return (
                    <div>
                    <div className="greeting">  <h2 className="discover">Descover . . .</h2>
                    <div >
                    </div>
            
                </div>
                <hr className="home-hr"></hr>
                <div className="user_home">
            
            
             {state.length !== undefined && <section className="cards">
                 {state.map(hobby =>  
                    <a key={key++} className="card">
                    <div className="card_image-container">
                        <img  src={ImgThree} alt="Hobby picture" />
                    </div>
            
                    <div   className="card_content">
                        <p className="cart_title text_medium">
                            {hobby.name}
                        </p>
                        <div className="card_info">
                            <p  className="text_medium">Find out more...</p>
                            <p className="card_price text_medium">{hobby.price}</p>
                        </div>
                    </div>
                </a>) 
             }
             </section>}
             </div>
            
             { welcomeDiv.showDiv && <div>
                     <div className="introduction">
                      <div className="intro-text">
                      <p> You have no hobbie matches. Plase fill in the form and create a new offer:</p>
                             <div className="cta">
                                         <button className="cta_add" ><a className="cta_second_s" href="/test">Create new Offer</a></button>
                             </div>
                         </div>
                     </div>
            
                 </div>}
            
            
            
            
            <img className="blueImg3" src={blueImg} alt="blueImg3"/>
            <img className="blueImg4" src={blueImg} alt="blueImg4"/>
            <img className="blue" src={blueImg} alt="blue"></img>
                     </div>
                   
                )
                
            }
            


export default UserHome

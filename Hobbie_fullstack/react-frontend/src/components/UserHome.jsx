import React from 'react'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'
import hikingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/1.jpg'
import ImgTwo from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import ImgThree from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/3.jpg'
import ImgFour from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/4.jpg'
import ImgFive from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/5.jpg'
import ImgSix from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/6.jpg'


const UserHome = () => {
    return (
        <div>
        <div className="greeting">  <h2 className="discover">Discover . . .</h2>
 <div >

 </div>

</div>
<hr className="home-hr"></hr>
<div className="user_home">


 <section className="cards">

     <a className="card" method="POST">
         <div className="card_image-container">
             <img src={hikingImg} alt="hobbie_img" />
         </div>

         <div   className="card_content">
             <p className="cart_title text_medium">
                 Hiking
             </p>
             <div className="card_info">
                 <p  className="text_medium">Find out more...</p>
                 <p className="card_price text_medium">500 CHF</p>
             </div>
         </div>
     </a>

     <a className="card" method="POST">
         <div className="card_image-container">
             <img  src={ImgThree} alt="Hobby picture" />
         </div>

         <div   className="card_content">
             <p className="cart_title text_medium">
                 Hiking
             </p>
             <div className="card_info">
                 <p  className="text_medium">Find out more...</p>
                 <p className="card_price text_medium">50 CHF</p>
             </div>
         </div>
     </a>

     <a className="card" method="POST">
         <div className="card_image-container">
             <img  src={ImgFour}  />
         </div>

         <div   className="card_content">
             <p className="cart_title text_medium">
                 Yoga
             </p>
             <div className="card_info">
                 <p  className="text_medium">Find out more...</p>
                 <p className="card_price text_medium">35 CHF</p>
             </div>
         </div>
     </a>
     <a className="card" method="POST">
         <div className="card_image-container">
             <img  src={ImgFive} alt="Hobby picture" />
         </div>

         <div   className="card_content">
             <p className="cart_title text_medium">
                 Painting
             </p>
             <div className="card_info">
                 <p  className="text_medium">Find out more...</p>
                 <p className="card_price text_medium">40 CHF</p>
             </div>
         </div>
     </a>
     <a className="card" method="POST">
         <div className="card_image-container">
             <img  src={ImgTwo} alt="Hobby picture" />
         </div>

         <div   className="card_content">
             <p className="cart_title text_medium">
                 Dancing
             </p>
             <div className="card_info">
                 <p  className="text_medium">Find out more...</p>
                 <p className="card_price text_medium">25 CHF</p>
             </div>
         </div>
     </a>
     <a className="card" method="POST">
         <div className="card_image-container">
             <img  src={ImgSix} alt="Hobby picture" />
         </div>

         <div   className="card_content">
             <p className="cart_title text_medium">
                 Photography
             </p>
             <div className="card_info">
                 <p  className="text_medium">Find out more...</p>
                 <p className="card_price text_medium">35 CHF</p>
             </div>
         </div>
     </a>
 </section>
</div>

<img className="blueImg3" src={blueImg} alt="blueImg3"/>
<img className="blueImg4" src={blueImg} alt="blueImg4"/>
<img className="blue" src={blueImg} alt="blue"></img>
         </div>
    )
}

export default UserHome

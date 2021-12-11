import React from 'react'
import dancingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'

const AccountBusiness = () => {
    return (
     
<div className="account-main">
    <div className="account-container">
  
        <img className="account-cover" src={dancingImg} alt="dancing"/>
   

        <div className="account-content">
            <div className="account-content-body">

                <div className="account-label">
                    <span className="account-title"><b>Account info</b></span>
                    <hr className="account-hr"></hr>
                    <p>Username: </p>
                    <p>Email: </p>
                    <p>Business name: </p>
                    <p>Business address: </p>
                    <p>Change password: </p>
                    <br></br>
                    
                    
        <div className="account-buttons">     
        <a  className="add-crt-edit">Edit</a>
        
        <a className="add-crt-edit" >Delete profile</a>
                </div>
            </div>
        </div>
    </div>
 </div>
    <img className="blueImg3" src={blueImg} alt="blueImg3"/>
<img className="blueImg4" src={blueImg} alt="blueImg4"/>
<img className="blue" src={blueImg} alt="blue"></img>
</div>
    
    )
}

export default AccountBusiness

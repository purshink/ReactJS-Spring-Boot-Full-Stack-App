import React from 'react'
import dancingImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/2.jpg'
import blueImg from '/home/nix/Documents/my_apps/Hobbie_fullstack/react-frontend/src/img/blueImg.png'

const AccountUser = () => {
    return (
        <div className="account-main">
        <div className="account-container">
      
            <img className="account-cover" src={dancingImg} alt="dancing"/>
       
    
            <div className="account-content">
            <div className="account-content-body">

                <div className="account-label">
                    <span className="account-title"><b>Account info</b></span>
                    <hr></hr>
                    <br></br>
                    <p > Username: </p>
                    <p > Email: </p>
                    <p > Full Name: </p>
                    <p > Gender: </p>
                    <p> Change password: </p>
                    <br></br>



                    <div class="">

                        <span className="add-crt-edit">Edit<span></span></span>
                        <span className="add-crt-edit">Delete profile<span></span></span>
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

export default AccountUser

// import React from 'react'
// import blueImg from '/home/nix/my-app/src/img/blueImg.png'
// import { Component } from 'react'
// import { useNavigate } from 'react-router-dom';



// class Login extends Component {

//     constructor(props){
        
//         super(props)
//         this.state = {
//             username: '',
//             password: '',
//             hasLoginFailed: false,
//             showSuccessMessage: false
//         }
//         this.handlerChange = this.handlerChange.bind(this) 
//         this.loginClicked = this.loginClicked.bind(this)

        

      
//     }

//     handlerChange(event){
//             this.setState({
//                 [event.target.name]: event.target.value
//             })
//     }
    
//     loginClicked(event){
//         event.preventDefault();
//         if(this.state.username === 'purshink' && this.state.password === '123'){
//             // this.props.navigation.navigate('UserHome')
//             // this.props.history.push("/home")
//             this.setState({hasLoginFailed:false})
//             this.setState({showSuccessMessage:true})
//         }
//         else {
//             this.setState({showSuccessMessage:false})
//             this.setState({hasLoginFailed:true})
//         }
//     }



//     render(){
        
//         return (
//         <div>
//              <form className="test">
//          <div className="loginh1"><h1 >Login</h1></div>
//      {/* <div style="display:none">LOGIN_PAGE_IDENTIFIER</div> */}
//     <div className="login" >
//   <div className="row">
  
//     <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
//     <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>
//     {/* OR this.state.hasLoginFailed &&  <div  className="errors" > Invalid credentials</div>*/}

//   <div className="form-field">
//     <div className="name-section">
//         <input type="text" name="username"  value={this.state.username}  onChange={this.handlerChange} required/>
//         <label id="name" className="label-name">
//             <span className="content-name">Username</span>
//         </label>
//     </div>
//     </div>
//     </div>
//               <div className="row">
//                 <div className="form-field">
//                   <div className="name-section">
//                       <input type="password"  name="password" value={this.state.password} onChange={this.handlerChange}  required/>
//                       <label htmlFor="password" className="label-name">
//                           <span className="content-name">Password</span>
//                       </label>
//                   </div>
//                   </div>
//                   </div>
                     
//                         <div className="form-field">
//                       <button className="button button2"  onClick={this.loginClicked}>Login</button>
//                         </div>

                        
                    
//     </div>

//  </form>

// <img className="blueImg2" src={blueImg} alt="blueImg"></img>
//         </div>
//         )
//     }
// }

// function ShowInvalidCredentials(props) {
//         if(props.hasLoginFailed){
//             return   <div  className="errors" >
//             Invalid credentials
//         </div>
//         }

//         return null;
// }
// function ShowLoginSuccessMessage(props) {
//     if(props.showSuccessMessage){
//         return        <div  className="errors">Login successful</div>
//     }

//     return null;
// }


// export default Login


import React from 'react'
import blueImg from '/home/nix/my-app/src/img/blueImg.png'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import AuthenticationService from './AuthenticationService'




const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [loginState, setLoginState] = useState({
        hasLoginFailed: false,
        showSuccessMessage: false
    })
  
    
    const loginClicked= (event) =>{
        event.preventDefault();
      
        if(credentials.username === 'business' && credentials.password === '123'){
            AuthenticationService.registerSuccessfulLoginBusiness(credentials.username)
            navigate("/business-owner")
        
            setLoginState(prevState => ({...prevState,hasLoginFailed:false}))
            setLoginState(prevState =>({...prevState,showSuccessMessage:true}))
            window.location.reload(false)
        }
       else if(credentials.username === 'user' && credentials.password === '123'){
            AuthenticationService.registerSuccessfulLoginUser(credentials.username)
            navigate("/user-home")
        
            setLoginState(prevState => ({...prevState,hasLoginFailed:false}))
            setLoginState(prevState =>({...prevState,showSuccessMessage:true}))
            window.location.reload(false)
        }
        else {
            setLoginState(prevState => ({...prevState,hasLoginFailed:true}))
            setLoginState(prevState =>({...prevState,showSuccessMessage:false}))
                }
             
    }
        
        return (
        <div>
             <form className="test">
         <div className="loginh1"><h1 >Login</h1></div>
     {/* <div style="display:none"> LOGIN_PAGE_IDENTIFIER</div> */}
    <div className="login" >
  <div className="row">
  
    {loginState.hasLoginFailed &&  <div  className="midErrors" > Invalid credentials</div>}
    {loginState.showSuccessMessage && <div className="midErrors">Login successful</div>}
  

  <div className="form-field">
    <div className="name-section">
        <input type="text" name="username"  onChange={e => setCredentials({...credentials, username : e.target.value})} required/>
        <label id="name" className="label-name">
            <span className="content-name">Username</span>
        </label>
    </div>
    </div>
    </div>
              <div className="row">
                <div className="form-field">
                  <div className="name-section">
                      <input type="password"  name="password"  onChange={e => setCredentials({...credentials, password : e.target.value})}  required/>
                      <label htmlFor="password" className="label-name">
                          <span className="content-name">Password</span>
                      </label>
                  </div>
                  </div>
                  </div>
                     
                        <div className="form-field">
                      <button className="button button2"  onClick={loginClicked}>Login</button>
                        </div>

                        
                    
    </div>

 </form>

<img className="blueImg2" src={blueImg} alt="blueImg"></img>
        </div>
        )
}


export default Login

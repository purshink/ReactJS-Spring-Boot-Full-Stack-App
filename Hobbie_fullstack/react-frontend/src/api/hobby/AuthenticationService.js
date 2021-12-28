import axios from "axios"


class AuthenticationService {
    


    registerSuccessfulLoginBusiness(username){
    
        sessionStorage.setItem('authenticatedUser', username)
        sessionStorage.setItem('role', 'business')
        console.log('Successful login')
 
    }
    registerSuccessfulLoginUser(username){
    
        sessionStorage.setItem('authenticatedUser', username)
        sessionStorage.setItem('role', 'user')
        console.log('Successful login')
     
    }


    logout(){
     sessionStorage.clear();
     window.location.reload(false)
    }

    isUserLoggedIn(){
        let role = sessionStorage.getItem('role');
        if (role !== 'user'){
            return false;
        }
        else {
            return true;
        }
    }
    isBusinessLoggedIn(){
        let role = sessionStorage.getItem('role');
        if (role !== 'business'){
            return false;
        }
        else {
            return true;
        }
    }

    getLoggedInUser(){
        let username = sessionStorage.getItem('authenticatedUser');
        if (username == null){
            return '';
        }
        else {
            return username;
        }
       }

     

       //todo: DOES NOT UPDATE ON BROWSER REFRESH 
    //    setUpAxiosInterseptors(){
    //     console.log("Setting up interceptors.")
    //     let username = 'user';
    //     let password = '123';
    //     let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
        
     
        
    //     axios.interceptors.request.use(
          
    //             (config) => {
    //                 if(this.isUserLoggedIn){
    //                 config.headers['Authorization'] = basicAuthHeader;
    //                 }
    //                     console.log("Success");
    //                 return config;
    //             }
    //         )
    //    }

       

    
}


export default  new AuthenticationService()
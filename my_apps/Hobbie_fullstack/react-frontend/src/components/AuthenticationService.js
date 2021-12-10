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
}

export default  new AuthenticationService()
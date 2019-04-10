class AuthService{
    constructor(authenticationStatus){
        this.authStatus = "none";
    }
    setAuthStatus(authStatus){
        this.authStatus = authStatus;
    }
    getAuthStatus(){
        return this.authStatus;
    }
}



const LOCAL_NOTE = 'token';

const saveToken = (token) => {
    localStorage.setItem(LOCAL_NOTE, JSON.stringify(token));
};


const isTokenExpired = () => {
    let token  = getToken();
    return new Date()>= new Date(token.expiresAt);
};

const getToken = ()=>{
    let token = null;
    try {
        token = JSON.parse(localStorage.getItem(LOCAL_NOTE));
    }catch (err){
        console.log("Error: " + err)
    }
    return token;
}

const getJwtToken = ()=>{
    let token  = getToken();
    return token.authenticationToken;
}

const getUsername = ()=>{
    let token  = getToken();
    return token.username;
}


import {API_BASE_URL, APP_USER_ROLES} from '../constant/Config';
import inMemoryJWT from './InMemoryJwt';

const LOCALSTORAGE_TOKEN = 'token';
//TODO : Refactor Rearrange Code, Change fetch to axios

export const getToken = () => {
    let token = null;
    try {
        token = JSON.parse(localStorage.getItem(LOCALSTORAGE_TOKEN));
    } catch (err) {
        console.log("Error: " + err)
    }
    return token;
}

export const getRefreshToken = () => {
    let token = getToken();
    if (token) {
        return token.refreshToken;
    } else {
        return null;
    }
}

export const getAuthenticationToken= () => {
    let token = getToken();
    if (token) {
        return token.authenticationToken;
    } else {
        return null;
    }
}

export const getCurrentUsername = () => {
    let token = getToken();
    if (token) {
        return token.username;
    } else {
        return null;
    }
}

export const authProvider = {
    // called when the user attempts to log in
    login: ({username, password}) => {
        //TODO: remove test console.log
        console.log("login")
        const request = new Request(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include',
        });
        inMemoryJWT.setRefreshTokenEndpoint(`${API_BASE_URL}/auth/refresh/token`);
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((token) => {
                localStorage.setItem(LOCALSTORAGE_TOKEN, JSON.stringify(token));
            })
    },
    // called when the user clicks on the logout button
    logout: () => {
//TODO: remove test console.log
        console.log("logout")
        console.log(getRefreshToken())

        if (getRefreshToken()&&getCurrentUsername()) {
            let data = {
                refreshToken: getRefreshToken(),
                username: getCurrentUsername()
            }
            const request = new Request(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            });
            fetch(request).then((response) => {
                //TODO: remove test console.log
                console.log(response);
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Something went wrong');
                }
            })
                .then((responseText) => {
                    // TODO: Do something with the response
                    console.log(responseText);
                })
                .catch((error) => {
                    console.log(error)
                });
        }

        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        return Promise.resolve();

    },
    checkAuth: () => {
        console.log("checkAuth")
        if (getRefreshToken()) {

            let data = {
                refreshToken: getRefreshToken(),
                username: getCurrentUsername()
            }
            const request = new Request(API_BASE_URL + '/auth/refresh/token', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            });
            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then((token) => {


                    const roleRequest = new Request(API_BASE_URL + '/auth/user/role', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: new Headers({'Content-Type': 'application/json'}),
                        credentials: 'include',
                    });

                    return fetch(roleRequest)
                        .then(response => {
                            if (response.status < 200 || response.status >= 300) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .then((_roles) => {
                            for (let i = 0; i < _roles.length; i++){
                                const r = _roles[i];
                                for (let j = 0; j < APP_USER_ROLES.length; j++){
                                    if (APP_USER_ROLES[j]===r){
                                        console.log(r);
                                        localStorage.setItem(LOCALSTORAGE_TOKEN, JSON.stringify(token));
                                        return Promise.resolve();
                                    }
                                }
                            }
                            console.log("invalid role");
                   throw new Error("Your role have no permission");
                        })
                })
               .catch((error) => {
                    console.log(error)
                    localStorage.removeItem(LOCALSTORAGE_TOKEN);
                    return Promise.reject(error.toString());
                });
        } else {
            console.log("auth null")
            return Promise.reject();
        }
    }
    ,
    checkError: (error) => {
        console.log("checkError")
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem(LOCALSTORAGE_TOKEN);
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        /*        const role = localStorage.getItem('permissions');
                return role ? Promise.resolve(role) : Promise.reject();*/
        return Promise.resolve();
    }, getIdentity: () => {
        console.log("getIdentity")
        if(getCurrentUsername()){
            let user = {
                id: "",
                fullName: getCurrentUsername(),
                avatar: `https://avatars.dicebear.com/api/croodles-neutral/${getCurrentUsername()}.svg`
            }
            try {
                /*            const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
                            return Promise.resolve({ id, fullName, avatar });*/
                return Promise.resolve(user);
            } catch (error) {
                return Promise.reject(error);
            }
        }else {
            return Promise.reject();
        }

    }
};

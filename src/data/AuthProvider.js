import {API_BASE_URL} from '../constant/Config';
import inMemoryJWT from './InMemoryJwt';

const LOCALSTORAGE_TOKEN = 'token';

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

export const getCurrentUser = () => {
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

        console.log("logout")
        console.log(getRefreshToken())
        console.log(getCurrentUser())
        if (getRefreshToken()&&getCurrentUser()) {
            let data = {
                refreshToken: getRefreshToken(),
                username: getCurrentUser()
            }
            const request = new Request(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            });
            fetch(request).then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Something went wrong');
                }
            })
                .then((responseText) => {
                    // Do something with the response
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
                username: getCurrentUser()
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
                    localStorage.setItem(LOCALSTORAGE_TOKEN, JSON.stringify(token));
                    return Promise.resolve();
                })
                .catch((error) => {
                    console.log(error)
                    localStorage.removeItem(LOCALSTORAGE_TOKEN);
                    return Promise.reject();
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
        if(getCurrentUser()){
            let user = {
                id: "",
                fullName: getCurrentUser(),
                avatar: `https://avatars.dicebear.com/api/croodles-neutral/${getCurrentUser()}.svg`
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

import {API_BASE_URL} from "../constant/Config";

const inMemoryJWTManager = () => {
    let inMemoryJWT = null;
    let isRefreshing = null;
    let refreshToken = null;
    let currentUser = null;
    let logoutEventName = 'ra-logout';
    let refreshEndpoint = '/refresh-token';
    let refreshTimeOutId;

    const getToken = () => inMemoryJWT;
    const getCurrentRefreshToken = () => refreshToken;
    const setLogoutEventName = name => logoutEventName = name;
    const setRefreshTokenEndpoint = endpoint => refreshEndpoint = endpoint;


    // This countdown feature is used to renew the JWT before it's no longer valid
    // in a way that is transparent to the user.
    const refreshTokenEvent = (delay) => {
        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            (5000)
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abortRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    const waitForTokenRefresh = () => {
        if (!isRefreshing) {
            return Promise.resolve();
        }
        return isRefreshing.then(() => {
            isRefreshing = null;
            return true;
        });
    }

    // The method make a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will set a fresh jwt in memory.
    const getRefreshedToken = () => {
        let data = {
            refreshToken:getCurrentRefreshToken(),
            username:getCurrentUser()
        }
        const request = new Request(refreshEndpoint, {
            method: 'POST',
            body:   JSON.stringify(data),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });



        isRefreshing = fetch(request)
            .then((response) => {
                if (response.status !== 200) {
                    eraseToken();
                    global.console.log(
                        'Token renewal failure'
                    );
                    return { authenticationToken: null };
                }
                return response.json();
            })
            .then(({ authenticationToken, refreshToken,expiresAt,username }) => {
                if (authenticationToken) {
                    setToken(authenticationToken,refreshToken, expiresAt,username);
                    return true;
                }
                eraseToken();
                return false;
            });

        return isRefreshing;
    };
    const getCurrentUser = () => {
     console.log('Get Current User')
        return currentUser;
    }



    const setToken = (token, _refreshToken,delay,username) => {
        inMemoryJWT = token;
        refreshToken = _refreshToken;
        currentUser = username;
        console.log(delay);
        var date = new Date(delay);
        console.log(date);
        refreshTokenEvent(delay);
        return true;
    };

    const eraseToken = () => {
        let currentRefreshToken = getCurrentRefreshToken();
        let currentUser = getCurrentUser();
        const request = new Request(API_BASE_URL+'/logout', {

            method: 'POST',
            body: JSON.stringify({ currentRefreshToken, currentUser }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });
        // fetch(request).then(response => {
        //     if (response.status < 200 || response.status >= 300) {
        //         throw new Error(response.statusText);
        //     }
        //
        // })
        inMemoryJWT = null;
        abortRefreshToken();
        window.localStorage.setItem(logoutEventName, Date.now());
        return true;
    }


    // This listener will allow to disconnect a session of ra started in another tab
    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            inMemoryJWT = null;
        }
    });

    return {
        eraseToken,
        getRefreshedToken,
        getToken,
        setLogoutEventName,
        setRefreshTokenEndpoint,
        setToken,
        waitForTokenRefresh,
        getCurrentRefreshToken,
        getCurrentUser
    }
};

export default inMemoryJWTManager();
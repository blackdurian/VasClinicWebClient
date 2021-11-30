import * as React from "react";
import { Route } from "react-router";
import {fetchUtils, Admin, Resource, ListGuesser} from 'react-admin';

import {authProvider, getToken} from '../data/AuthProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import {API_BASE_URL} from '../constant/Config';
import Dashboard from "../pages/dashboard/Dashboard";
import {VaccineList} from "../pages/vaccine/VaccineList";
import CustomLayout from "../layout/Layout";
import {ProfileShow} from "../pages/profile/ProfileShow";


const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    const auth = getToken();
    options.headers.set('Authorization', `Bearer ${auth.authenticationToken}`);
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider(API_BASE_URL, httpClient);
/*,

<Route exact path="/resetPassword" component={ResetPassword} noLayout/>*/
const App = () => (
    <Admin disableTelemetry
           dashboard={Dashboard}
           authProvider={authProvider}
           dataProvider={dataProvider}
           layout={CustomLayout}
           customRoutes={[
               <Route
                   key="profile"
                   path="/profile"
                   render={() => <ProfileShow/>}

               />
           ]}
    >
      <Resource name="profile"/>
        <Resource name="vaccines" list={VaccineList}/>
    </Admin>
);
export default App;
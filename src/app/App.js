import * as React from "react";
import {Route} from "react-router";
import {fetchUtils, Admin, Resource, ListGuesser} from 'react-admin';

import {authProvider, getToken} from '../data/AuthProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import {API_BASE_URL} from '../constant/Config';
import Dashboard from "../pages/dashboard/Dashboard";
import CustomLayout from "../layout/Layout";
import {ProfileShow} from "../pages/profile/ProfileShow";
import {VaccineList} from "../pages/vaccine/VaccineList";
import {EmployeeList} from "../pages/employee/EmployeeList";
import {InventoryList} from "../pages/inventory/InventoryList";
import {ShiftBoardList} from "../pages/shiftboard/ShiftBoardList";
import {ShiftList} from "../pages/shift/ShiftList";
import {RecipientList} from "../pages/recipients/RecipientList";
import {AppointmentList} from "../pages/appointment/AppointmentList";
import {VaccineRecordsList} from "../pages/vaccinerecord/vaccinerecords";
import {InvoiceList} from "../pages/invoice/InvoiceList";

import LoginWithTheme from "../pages/login/Login";


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
           loginPage={LoginWithTheme}
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
        <Resource name="employees/clinic" list={EmployeeList}/>
        <Resource name="shift/board" list={ShiftBoardList}/>
        <Resource name="shift" list={ShiftList}/>
        <Resource name="vaccines" list={VaccineList}/>
        <Resource name="vaccine/inventory" list={InventoryList}/>
        <Resource name="recipients" list={RecipientList}/>
        <Resource name="appointments" list={AppointmentList}/>
        <Resource name="vaccine/records" list={VaccineRecordsList}/>
        <Resource name="invoices" list={InvoiceList}/>
    </Admin>
);
export default App;
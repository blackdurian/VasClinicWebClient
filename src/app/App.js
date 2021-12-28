import * as React from "react";
import {Route} from "react-router";
import {fetchUtils, Admin, Resource, ListGuesser} from 'react-admin';

import {authProvider, getToken} from '../data/AuthProvider';
import simpleRestProvider from 'ra-data-simple-rest';
import {API_BASE_URL} from '../constant/Config';
import Dashboard from "../pages/dashboard/Dashboard";
import CustomLayout from "../layout/Layout";
//TODO : encapsulate to array for each page index.js
import {ProfileShow} from "../pages/profile/ProfileShow";
import {VaccineList} from "../pages/vaccine/VaccineList";
import {EmployeeList} from "../pages/employee/EmployeeList";
import {InventoryList} from "../pages/inventory/InventoryList";
import {ShiftBoardList} from "../pages/shiftboard/ShiftBoardList";
import {ShiftList} from "../pages/shift/ShiftList";
import {RecipientList} from "../pages/recipients/RecipientList";
import {AppointmentList} from "../pages/appointment/AppointmentList";
import {VaccineRecordsList} from "../pages/vaccinerecord/VaccineRecordsList";
import {InvoiceList} from "../pages/invoice/InvoiceList";
import {SurveyResultList} from "../pages/surveyresult/SurveyResultList";

import LoginWithTheme from "../pages/login/Login";
import {EmployeeCreate} from "../pages/employee/EmployeeCreate";
import {ShiftBoardCreate} from "../pages/shiftboard/ShiftBoardCreate";

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
        <Resource name="employees/clinic" list={EmployeeList} create={EmployeeCreate} options={{ label: 'Clinic Employees' }}/>
        <Resource name="shift/board" list={ShiftBoardList} create={ShiftBoardCreate}  options={{ label: 'ShiftBoard' }}/>
        <Resource name="shift" list={ShiftList} options={{ label: 'Shift' }}/>
        <Resource name="vaccines" list={VaccineList}/>
        <Resource name="vaccine/inventory" list={InventoryList} options={{ label: 'Vaccine Inventory'}}/>
        <Resource name="vaccine/records" list={VaccineRecordsList} options={{ label: 'Vaccine Records' }}/>
        <Resource name="recipients" list={RecipientList}/>
        <Resource name="appointments" list={AppointmentList}/>
        <Resource name="invoices" list={InvoiceList}/>
        <Resource name="survey/results" list={SurveyResultList} options={{ label: 'Survey Results' }}/>
    </Admin>
);
export default App;
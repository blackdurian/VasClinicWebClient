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
import {VaccineList} from "../pages/vaccine/vaccine/VaccineList";
import {EmployeeList} from "../pages/clinic/employee/EmployeeList";
import {InventoryList} from "../pages/vaccine/inventory/InventoryList";
import {ShiftBoardList} from "../pages/clinic/shiftboard/ShiftBoardList";
import {ShiftList} from "../pages/clinic/shift/ShiftList";
import {RecipientList} from "../pages/recipients/recipient/RecipientList";
import {AppointmentList} from "../pages/recipients/appointment/AppointmentList";
import {RecordsList} from "../pages/recipients/record/RecordsList";
import {InvoiceList} from "../pages/recipients/invoice/InvoiceList";
import {SurveyResultList} from "../pages/survey/surveyresult/SurveyResultList";

import LoginWithTheme from "../pages/login/Login";
import {EmployeeCreate} from "../pages/clinic/employee/EmployeeCreate";
import {ShiftBoardCreate} from "../pages/clinic/shiftboard/ShiftBoardCreate";
import {ShiftCreate} from "../pages/clinic/shift/ShiftCreate";
import {ShiftBoardEdit} from "../pages/clinic/shiftboard/ShiftBoardEdit";
import {OrderList} from "../pages/vaccine/order/OrderList";
import {OrderCreate} from "../pages/vaccine/order/OrderCreate";

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

        <Resource name="clinic/employees" list={EmployeeList} create={EmployeeCreate} options={{ label: 'Clinic Employees' }}/>
        <Resource name="shift/board" list={ShiftBoardList} create={ShiftBoardCreate} edit={ShiftBoardEdit}  options={{ label: 'ShiftBoard' }}/>
        <Resource name="shift" list={ShiftList} create={ShiftCreate} options={{ label: 'Shift' }}/>
        <Resource name="vaccines/orders/clinic" list={OrderList} create={OrderCreate} options={{ label: 'Vaccine Order'}}/>
        <Resource name="vaccines/inventory" list={InventoryList} options={{ label: 'Vaccine Inventory'}}/>
        <Resource name="vaccines/records" list={RecordsList} options={{ label: 'Vaccine Records' }}/>
        <Resource name="vaccines" list={VaccineList}/>
        <Resource name="recipients" list={RecipientList}/>
        <Resource name="appointments" list={AppointmentList}/>
        <Resource name="invoices" list={InvoiceList}/>
        <Resource name="survey/results" list={SurveyResultList} options={{ label: 'Survey Results' }}/>
        {/*Resource for SelectInput  */}
        <Resource name="clinic/doctor/SelectInput"/>

        {/*        <Resource name="clinic/roles"/>// TODO filter
        <Resource name="shift/board/statuses"/> // TODO filter*/}

        {/*Resource for Reference  */}
        <Resource name="diseases"/>
    </Admin>
);
export default App;
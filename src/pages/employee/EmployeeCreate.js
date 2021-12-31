import * as React from "react";
import {
    Create,
    email,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    PasswordInput,
    required,
    minLength } from 'react-admin';

const validateEmail = email();
const validatePassword =  [required(), minLength(8)];
//TODO getChoices json from server
const genderChoices = [
    { id: 'M', name: 'Male' },
    { id: 'F', name: 'Female' },
    { id: 'UNKNOWN', name: 'Unknown' },
];

const roleChoices = [
    { id: 'ROLE_CLINIC_DOCTOR', name: 'Clinic Doctor' }
];
// todo: bod input set max date and min date
// todo: add confirm password input
// todo: useStyle
export const EmployeeCreate = (props) => {
    return(
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="username" validate={required()} />
            <PasswordInput source="password" validate={validatePassword} />
            <TextInput label="Email" source="email" validate={validateEmail} />
            <TextInput source="name" validate={required()} />
            <SelectInput source="gender" choices={genderChoices} validate={required()} />
            <DateInput label="Birthdate" source="bod"  maxDate={new Date()} validate={required()} />
            <SelectInput source="role" choices={roleChoices} validate={required()} />
        </SimpleForm>
    </Create>
)};



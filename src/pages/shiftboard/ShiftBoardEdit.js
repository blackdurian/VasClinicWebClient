import {ReferenceInput, SelectInput, SimpleForm, TextInput, Edit, required} from "react-admin";
import * as React from "react";

const statusChoices = [
    { id: 'CANCELLED', name: 'CANCELLED' },
    { id: 'DRAFT', name: 'DRAFT' },
    { id: 'PUBLISHED', name: 'PUBLISHED' },
];

export const ShiftBoardEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" />
            <SelectInput source="status" choices={statusChoices} validate={required()} />
        </SimpleForm>
    </Edit>
);
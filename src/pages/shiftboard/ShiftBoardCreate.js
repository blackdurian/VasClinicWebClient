import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    regex
} from 'react-admin';
const validateName = [required(), regex(/^[a-z0-9]+$/i, 'Name allow only alphanumeric. No spaces allowed.')];

export const ShiftBoardCreate = (props) =>
    (
        <Create {...props}>
            <SimpleForm redirect="list">
                <TextInput source="name" validate={validateName}/>
            </SimpleForm>
        </Create>
    );



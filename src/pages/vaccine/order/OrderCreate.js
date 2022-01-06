import * as React from "react";
import {
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput
} from 'react-admin';

export const OrderCreate = (props) =>{
    return  (
        <Create {...props}>
            <SimpleForm redirect="list">
                <ReferenceInput label="Vaccine" source="vaccineId" reference="vaccines">
                    <SelectInput source="vaccineId" />
                </ReferenceInput>
                <NumberInput source="unit" />
            </SimpleForm>
        </Create>
    );
}
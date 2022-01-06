import * as React from "react";
import {
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    DateInput,
    required,
    number,
    minValue
} from 'react-admin';
const validateStock = [number(), minValue(0)];

//TODO:validation
export const InventoryCreate = (props) =>{
    return  (
        <Create {...props}>
            <SimpleForm redirect="list">
                <ReferenceInput label="Vaccine" source="vaccineId" reference="vaccines">
                    <SelectInput source="vaccineId" />
                </ReferenceInput>
                <NumberInput source="stock" validate={validateStock}/>
                <NumberInput source="unitPrice" />
                <DateInput label="Manufacturing Date" source="mfgDate"  validate={required()}  />
                <DateInput label="Expiry Date" source="expiryDate"  validate={required()}  />
            </SimpleForm>
        </Create>
    );
}



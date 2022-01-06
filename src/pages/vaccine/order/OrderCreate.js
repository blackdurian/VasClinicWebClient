import * as React from "react";
import {
    Create,
    SimpleForm,
    required,
    DateTimeInput, ReferenceInput, SelectInput, NumberField, TextField, ReferenceField, NumberInput
} from 'react-admin';
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../../constant/Config";

// TODO: change to full calender time input
export const OrderCreate = (props) =>{
/*    const [shiftBoardChoices, setShiftBoardChoices] = useState([]);
    useEffect(() => {
        let mounted = true;
        getList()
            .then(items => {
                if(mounted) {
                    setList(items)
                }
            })
        return () => mounted = false;

            const request = new Request(`${API_BASE_URL}/auth/getCurrentClinicDoctor`, {
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            });

    }, []

    )*/

   // time format ISO_OFFSET_DATE 2011-12-03+01:00
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


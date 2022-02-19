import * as React from "react";
import {
    Create,
    SimpleForm,
    required,
     DateTimeInput, ReferenceInput, SelectInput
} from 'react-admin';
import {useEffect, useState} from "react";

import moment from "moment";

// TODO: change to full calender time input
export const ShiftCreate = (props) =>{
    const [end, setEnd] = useState ([]);


//TODO: get Choices of doctor instead of employee
//TODO: change time picker
//TODO: validate start time and end time
   // time format ISO_OFFSET_DATE 2011-12-03+01:00
    return  (
        <Create {...props}>
            <SimpleForm redirect="list">
                <DateTimeInput
                    label="Start time" source="start"
                    onChange={event => {
                    let endTime = moment(event.target.value).add(15, 'minutes').toISOString();
                    setEnd(endTime);
                    }}
                    validate={required()}
                />
                <DateTimeInput label="End Time" source="end"  initialValue={end} validate={required()}    />
                <ReferenceInput label="Doctor" source="doctor" reference="clinic/employees" allowEmpty>
                <SelectInput source="doctor" />
                </ReferenceInput>
       
                <ReferenceInput label="ShiftBoard" source="shiftBoard" reference="shift/board" allowEmpty>
                    <SelectInput  source="shiftBoard"  validate={required()}/>
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
}


import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    NumberField,
    ReferenceField,
    EditButton,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput, DateField, BooleanField,
} from 'react-admin';



const shiftFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

export const ShiftList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} sort={{ field: 'name', order: 'DESC' }}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => `${record.doseRequire} Dose Require`}
                    tertiaryText={record => record.mfgCompany}
                />
            ) : (
                <Datagrid>
                    <NumberField source="id" />
                    <DateField source="start" showTime/>
                    <DateField source="end" showTime/>
                    <ReferenceField label="Doctor Name" source="doctor" reference="clinic/employees">
                    <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Shift Board" source="shiftBoard" reference="shift/board">
                    <TextField source="name" />
                    </ReferenceField>
                    <BooleanField source="enabled" />
                </Datagrid>
            )}
        </List>
    );
}



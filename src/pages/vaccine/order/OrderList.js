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
    TextInput,
} from 'react-admin';

//TODO: filter OrderList
//TODO: filter Confirm Order button
const Filter = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];
//TODO: received button
export const OrderList = (props) => {
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
                    <TextField source="uuid" />
                    <ReferenceField label="Vaccine" source="vaccineId" reference="vaccines">
                        <TextField source="name" />
                    </ReferenceField>
                    <NumberField source="unit" />
                    <TextField source="status" />
                </Datagrid>
            )}
        </List>
    );
}





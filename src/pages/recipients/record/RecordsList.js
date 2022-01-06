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


export const RecordsList = (props) => {
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
                    <TextField source="name" />
                    <NumberField source="doseRequire" />
                    <NumberField source="dosesPerVial" />
                    <TextField source="mfgCompany" />
                    <NumberField source="createdAt" />
                    <NumberField source="updatedAt" />
                </Datagrid>
            )}
        </List>
    );
}
import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    ReferenceInput,
    SelectInput,
    TextInput,
    EmailField,
} from 'react-admin';



const postFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" allowEmpty>
        <SelectInput optionText="name" />
    </ReferenceInput>,
];

//TODO: filters/search
export const RecipientList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} sort={{ field: 'name', order: 'DESC' }}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => record.name}
                    tertiaryText={record => record.email}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" label="Username"/>
                    <TextField source="name" />
                    <EmailField source="email" />
                </Datagrid>
            )}
        </List>
    );
}

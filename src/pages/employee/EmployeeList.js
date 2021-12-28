import * as React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, EmailField, TextField, BooleanField } from 'react-admin';

export const EmployeeList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <List title="Clinic's Employee" {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.username}
                    tertiaryText={record => record.email}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" label="Username"/>
                    <TextField source="name" />
                    <EmailField source="email" />
                    <BooleanField source="verified" />
                </Datagrid>
            )}
        </List>
    );
};

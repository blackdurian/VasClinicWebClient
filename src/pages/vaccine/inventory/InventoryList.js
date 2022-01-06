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


export const InventoryList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} sort={{ field: 'name', order: 'DESC' }}>
            {isSmall ? (
                <SimpleList
                    primaryText={
                        <ReferenceField label="Vaccine" source="vaccineId" reference="vaccines">
                            <TextField source="name" />
                        </ReferenceField>
                    }
                    secondaryText={record => `$ ${record.unitPrice}`}
                    tertiaryText={record => record.stock}
                />
            ) : (
                <Datagrid>

                    <ReferenceField label="Vaccine" source="vaccineId" reference="vaccines">
                        <TextField source="name" />
                    </ReferenceField>
                    <NumberField source="stock" />
                    <TextField source="mfgDate" />
                    <TextField source="expiryDate" />
                    <NumberField source="unitPrice" />
                </Datagrid>
            )}
        </List>
    );
}

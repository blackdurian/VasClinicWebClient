import * as React from "react";
import {
    useNotify, useRefresh, useRedirect, Show,
    SimpleShowLayout, TextField, DateField,
    EmailField,EditButton, TopToolbar
} from 'react-admin';

import {SvgIcon} from "@material-ui/core";
import { MdPassword } from "react-icons/md";

import {getCurrentUser} from "../../data/AuthProvider";


const ProfileShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <EditButton icon={<SvgIcon component={MdPassword}  />}	basePath ={basePath} record={data}  label="Change Password"/>
    </TopToolbar>
);

//TODO: STOP request when hit error
export const ProfileShow = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onFailure = (error) => {
        console.log(error);
        notify('ra.notification.item_doesnt_exist', 'warning');
        redirect('/');
        refresh();
    };

    return(
    <Show
        actions={<ProfileShowActions/>}
        basePath="profile"
        id={getCurrentUser()}
        onFailure={onFailure} //TODO: Fix function no mounted, when page reload
        resource="profile"
        {...props}
    >
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="id" label="Username"/>
            <EmailField source="email" />
            <TextField source="gender" />
            <DateField label="Birth date" source="bod" />
            <TextField source="roles" />

        </SimpleShowLayout>
    </Show>
);}

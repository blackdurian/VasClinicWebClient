import * as React from "react";
import {
    useNotify, useRefresh, useRedirect, Show,
    SimpleShowLayout, TextField, DateField,ImageField,
    EmailField,EditButton, TopToolbar
} from 'react-admin';

import {SvgIcon, makeStyles } from "@material-ui/core";
import { MdPassword } from "react-icons/md";

import {getCurrentUsername} from "../../data/AuthProvider";
import {API_BASE_URL} from "../../constant/Config";

const useStyles = makeStyles({

    img: {
        width: 'initial',
        minWidth: 'initial',
        maxWidth: '42em',
        maxHeight: '15em',
    },
});

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
    const classes = useStyles();
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
        id={getCurrentUsername()}
        onFailure={onFailure} //TODO: Fix function no mounted, when page reload
        resource="profile"
        {...props}
    >
        <SimpleShowLayout>
            <img src={`https://avatars.dicebear.com/api/croodles-neutral/${getCurrentUsername()}.svg`} alt="Avatar" className={classes.img}  />

            <TextField source="name" />
            <TextField source="id" label="Username"/>
            <EmailField source="email" />
            <TextField source="gender" />
            <DateField label="Birth date" source="bod" />
            <TextField source="roles" />

        </SimpleShowLayout>
    </Show>
);}

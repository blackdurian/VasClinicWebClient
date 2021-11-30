import * as React from "react";
import {Show, SimpleShowLayout, TextField, DateField, RichTextField, EmailField,useShowController} from 'react-admin';



import Button from '@material-ui/core/Button';
import { EditButton, TopToolbar } from 'react-admin';
import {cloneElement} from "react";
import {getCurrentUser} from "../../data/AuthProvider";

const PostShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <EditButton basePath ={basePath} record={data} />
    </TopToolbar>
);

const MyShow = props => {
    const {
        basePath, // deduced from the location, useful for action buttons
        defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
        error,  // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onFailure` side effect.
        loaded, // boolean that is false until the record is available
        loading, // boolean that is true on mount, and false once the record was fetched
        record, // record fetched via dataProvider.getOne() based on the id from the location
        resource, // the resource name, deduced from the location. e.g. 'posts'
        version, // integer used by the refresh feature
    } = useShowController(props);
    return (
        <div>
            <h1>{defaultTitle}</h1>
            {cloneElement(props.children, {
                basePath,
                record,
                resource,
                version,
            })}
        </div>
    );
}
//TODO: STOP request when hit error
export const ProfileShow = (props) => (
    <Show basePath="profile"
            resource="profile"
            id={getCurrentUser()}
            {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <TextField source="id" label="Username"/>
            <EmailField source="email" />
            <TextField source="gender" />
            <DateField label="Birth date" source="bod" />
            <TextField source="roles" />

        </SimpleShowLayout>
    </Show>
);

// private String name;
//
// @NotBlank(message = "Username is required")
// private String username;
//
// @NotBlank(message = "Password is required")
// private String password;
//
// @Email
// @NotEmpty(message = "Email is required")
// private String email;
//
// @Enumerated(EnumType.STRING)
// @NotNull(message = "Gender is required")
// private Gender gender;
//
// @NotNull(message = "Born of date is required")
// private Instant bod;
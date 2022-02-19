import * as React from 'react';
import { useFormState } from 'react-final-form'

import {

    DateField,
    Edit,
    SaveButton,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    TextField,
    Toolbar,
    NumberField, TextInput, useRedirect,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from "react";
import {getToken} from "../../../data/AuthProvider";
import {API_BASE_URL} from "../../../constant/Config";


const AppointmentTitle = ({ record } ) => {
    return record ? (
        <span>
            Appointment
        </span>
    ) : null;
};

const RecipientDetails = ({ record }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/recipients/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.name}
        </Typography>
        <Typography
            component={Link}
            color="primary"
            href={`mailto:${record?.email}`}
            style={{ textDecoration: 'none' }}
        >
         {record?.email}
        </Typography>

        <Labeled source="Gender"  >
            <TextField source="gender" />
        </Labeled>
        <Labeled source="Birthday"  >
        <DateField source="bod"  />
        </Labeled>
    </Box>
);

const VaccineDetail = ({ record }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/vaccines/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.name}
        </Typography>
        <Labeled source="Dose Require"  >
            <NumberField source="doseRequire" />
        </Labeled>
        <Labeled source="Company"  >
            <TextField source="mfgCompany" />
        </Labeled>
    </Box>
);

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const AppointmentForm = (props) => {
    const redirect = useRedirect();
    const [remark, setRemark] = useState(props.record.remark);
    const [status, setStatus] = useState(props.record.status);

    console.log(props.record);

    const handleUpdateStatus =  event => {
      // selectInput onchange event
        setStatus(event.target.value)
    } ;

    const handleUpdateRemark =  event => {
        // selectInput onchange event
        setRemark(event.target.value)
    } ;

    const { push, record, showNotification } =  props;
    const handleSubmit = () => {
        const auth = getToken();

        const updatedRecord = {
            status: status,
            remark: remark,
        };
      //TODO: refactor to axios, add fetchUtil
        fetch(`${API_BASE_URL}/appointments/${record.id}`, { method: 'PUT',
            body: JSON.stringify(updatedRecord),
            headers:{
            'Content-Type': 'application/json',
                'Authorization':`Bearer ${auth.authenticationToken}`,
            }
        })
            .then(() => {
                //TODO: fix showNotification('Appointments '+status);
                //TODO: fix push('/appointments');
            })
            .catch((e) => {
                console.log("Error: Appointments not updated. " + e);
            });
        redirect('/appointments');
    }

    return (
        <FormWithRedirect
            {...props}

            render={(formProps) => (
                <Box maxWidth="50em">
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Typography variant="h6" gutterBottom>
                                        Appointment
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="Start time"
                                                resource="appointments"
                                            >
                                                <DateField
                                                    source="shift.start"
                                                    resource="appointments"
                                                    record={formProps.record}
                                                    showTime
                                                />
                                            </Labeled>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="End time"
                                                resource="appointments"
                                            >
                                                <DateField
                                                    source="shift.end"
                                                    resource="appointments"
                                                    record={formProps.record}
                                                    showTime
                                                />
                                            </Labeled>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Labeled
                                            source="Dose Number"
                                            resource="appointments"
                                        >
                                            <NumberField
                                                source="doseNumber"
                                                resource="appointments"
                                                record={formProps.record}
                                            />
                                        </Labeled>
                                        <Labeled
                                            source="Vaccination Id"
                                            resource="appointments"
                                        >
                                            <NumberField
                                                source="vaccinationId"
                                                resource="appointments"
                                                record={formProps.record}
                                            />
                                        </Labeled>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>

                                            <TextInput
                                                source="remark"
                                                resource="appointments"
                                                record={formProps.record}
                                                onChange={handleUpdateRemark}
                                            />

                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <SelectInput
                                                resource="appointments"
                                                source="status"
                                                choices={[
                                                    {
                                                        id: 'PENDING',
                                                        name: 'Pending',
                                                    },
                                                    {
                                                        id: 'PROCESSING',
                                                        name: 'Processing',
                                                    },
                                                    {
                                                        id: 'SCHEDULED',
                                                        name: 'Scheduled',
                                                    },
                                                    {
                                                        id: 'CANCELLED_BY_RECIPIENT',
                                                        name: 'Cancelled By Recipient',
                                                    },
                                                    {
                                                        id: 'CANCELLED',
                                                        name: 'Cancelled',
                                                    },
                                                    {
                                                        id: 'COMPLETED',
                                                        name: 'Completed',
                                                    },
                                                    {
                                                        id: 'DOSE_COMPLETED',
                                                        name: 'Dose Completed',
                                                    },

                                                ]}
                                                onChange={handleUpdateStatus}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography variant="h6" gutterBottom>
                                        Recipient
                                    </Typography>
                                    <ReferenceField
                                        source="recipient"
                                        resource="appointments"
                                        reference="recipients"
                                        basePath="/recipients"
                                        record={formProps.record}
                                        link={false}
                                    >
                                        <RecipientDetails />
                                    </ReferenceField>
                                    <Spacer />

                                    <Typography variant="h6" gutterBottom>
                                        Vaccine Detail
                                    </Typography>
                                    <ReferenceField
                                        source="vaccine.id"
                                        resource="appointments"
                                        reference="vaccines"
                                        basePath="/vaccines"
                                        record={formProps.record}
                                        link={false}
                                    >
                                        <VaccineDetail />
                                    </ReferenceField>
                                </Grid>
                            </Grid>
                            <Spacer />

                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}

                         >
                            <SaveButton

                                handleSubmitWithRedirect={handleSubmit}
                            />
                        </Toolbar>
                    </Card>
                </Box>
            )}
        />
    );
};
const AppointmentEdit = (props) => {

    const classes = useEditStyles();
    return (
        <Edit
            title={<AppointmentTitle />}
            classes={classes}
            {...props}
            component="div"

        >
            <AppointmentForm />
        </Edit>
    );
};

export default AppointmentEdit;
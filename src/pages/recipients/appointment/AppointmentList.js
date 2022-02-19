import * as React from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    Datagrid,
    DateField,
    List,
    ListContextProvider,
    NumberField,
    ReferenceInput,
    ReferenceField,
    SearchInput,
    TextField,
    useGetList,
    useListContext,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab} from '@material-ui/core';

const appFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="vaccine" reference="vaccines">
        <AutocompleteInput
            optionText={(choice) =>
                choice  // the empty choice is { id: '' }
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,
    <ReferenceInput source="recipient" reference="recipients">
        <AutocompleteInput
            optionText={(choice) =>
                choice  // the empty choice is { id: '' }
                    ? `${choice.name}`
                    : ''
            }
        />
    </ReferenceInput>,
];

//    PENDING,PROCESSING, SCHEDULED, CANCELLED_BY_RECIPIENT, CANCELLED, COMPLETED, DOSE_COMPLETED
const tabs = [
    { id: 'pending', name: 'pending' },
    { id: 'scheduled', name: 'scheduled' },
    { id: 'cancelled', name: 'cancelled' },
    { id: 'completed', name: 'completed' },
];

const useGetTotals = (filterValues ) => {
    const { total: totalPending } = useGetList(
        'appointments',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'pending' }
    );
    const { total: totalScheduled } = useGetList(
        'appointments',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'scheduled' }
    );
    const { total: totalCancelled } = useGetList(
        'appointments',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'cancelled' }
    );
    const { total: totalCompleted } = useGetList(
        'appointments',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'completed' }
    );
    return {
        pending: totalPending,
        scheduled: totalScheduled,
        cancelled: totalCancelled,
        completed: totalCompleted,
    };
};

const TabbedDataGrid = (props) => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const isXSmall = useMediaQuery(theme =>
            theme.breakpoints.down('xs')
    );
    const [pending, setPending] = useState ([]);
    const [scheduled, setScheduled] = useState ([] );
    const [cancelled, setCancelled] = useState([]);
    const [completed, setCompleted] = useState([]);
    const totals = useGetTotals(filterValues);

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'pending':
                    setPending(ids);
                    break;
                case 'scheduled':
                    setScheduled(ids);
                    break;
                case 'cancelled':
                    setCancelled(ids);
                    break;
                case 'completed':
                    setCompleted(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (event, value) => {
            setFilters &&
            setFilters(
                { ...filterValues, status: value },
                displayedFilters
            );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedIds =
        filterValues.status === 'pending'
            ? pending
            : filterValues.status === 'scheduled'
                ? scheduled
                : filterValues.status === 'cancelled'
                    ? cancelled
                    : completed;

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                value={filterValues.status}
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >

                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'pending' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: pending }}
                        >
                            <Datagrid {...props} optimized rowClick="edit">
                                <DateField label="Start time" source="shift.start" showTime/>
                                <DateField label="End time" source="shift.end" showTime/>
                                <ReferenceField label="Vaccine" source="vaccine.id" reference="vaccines">
                                    <TextField  source="name" />
                                </ReferenceField>

                                <NumberField source="doseNumber" />
                                <ReferenceField label="Recipient" source="recipient" reference="recipients">
                                    <TextField source="id" />
                                </ReferenceField>
                                <TextField source="status" />
                                <TextField source="remark" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'scheduled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: scheduled }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField label="Start time" source="shift.start" showTime/>
                                <DateField label="End time" source="shift.end" showTime/>
                                <ReferenceField label="Vaccine" source="vaccine.id" reference="vaccines">
                                    <TextField  source="name" />
                                </ReferenceField>

                                <NumberField source="doseNumber" />
                                <ReferenceField label="Recipient" source="recipient" reference="recipients">
                                    <TextField source="id" />
                                </ReferenceField>
                                <TextField source="status" />
                                <TextField source="remark" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'cancelled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField label="Start time" source="shift.start" showTime/>
                                <DateField label="End time" source="shift.end" showTime/>
                                <ReferenceField label="Vaccine" source="vaccine.id" reference="vaccines">
                                    <TextField  source="name" />
                                </ReferenceField>

                                <NumberField source="doseNumber" />
                                <ReferenceField label="Recipient" source="recipient" reference="recipients">
                                    <TextField source="id" />
                                </ReferenceField>
                                <TextField source="status" />
                                <TextField source="remark" />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'completed' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: completed }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField label="Start time" source="shift.start" showTime/>
                                <DateField label="End time" source="shift.end" showTime/>
                                <ReferenceField label="Vaccine" source="vaccine.id" reference="vaccines">
                                    <TextField  source="name" />
                                </ReferenceField>

                                <NumberField source="doseNumber" />
                                <ReferenceField label="Recipient" source="recipient" reference="recipients">
                                    <TextField source="id" />
                                </ReferenceField>
                                <TextField source="status" />
                                <TextField source="remark" />
                            </Datagrid>
                        </ListContextProvider>
                    )}

                </div>
            )}
        </Fragment>
    );
};

const AppointmentList = (props) => (
    <List
        {...props}
        filterDefaultValues={{ status: 'pending' }}
        sort={{ field: 'id', order: 'DESC' }}
        perPage={25}
        filters={appFilters}

    >
        <TabbedDataGrid />
    </List>
);
 
export default AppointmentList;
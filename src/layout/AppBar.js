import React from "react";
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import CustomUserMenu from "./CustomUserMenu";

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const CustomAppBar = (props) => {
    const classes = useStyles();
    return (
        <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer}>
            VAS Clinic
            </span>
        </AppBar>
    );
};

export default CustomAppBar;
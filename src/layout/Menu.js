import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DashboardMenuItem, MenuItemLink,} from 'react-admin';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {SvgIcon} from "@material-ui/core";

import VisitorIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { RiMedicineBottleFill, RiFolderUserFill,RiHistoryFill } from "react-icons/ri";
import { MdInventory } from "react-icons/md";
import { FaClinicMedical,FaUserMd,FaFileInvoiceDollar,FaCalendarCheck } from "react-icons/fa";

import SubMenu from './SubMenu';


const Menu = ({ dense = false } ) => {
    const [state, setState] = useState({
        menuClinic:true,
        menuVaccine:true,
        menuRecipient:true
    });

    const open = useSelector((state) => state.admin.ui.sidebarOpen);

    const classes = useStyles();

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div
            className={classnames(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open,
            })}
        >
            <DashboardMenuItem />
            <SubMenu
                handleToggle={() => handleToggle('menuClinic')}
                isOpen={state.menuClinic}
                name="Clinic"
                icon={<SvgIcon component={FaClinicMedical} viewBox="0 0 600 476.6"/>} //TODO : put icon in straight layout
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/employees/clinic',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Employees"
                    leftIcon={<SvgIcon component={FaUserMd} viewBox="0 0 550 446.6"/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/shift/board',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="ShiftBoard"
                    leftIcon={<SvgIcon component={AssignmentIcon}/>}
                    dense={dense}
                />

                <MenuItemLink
                    to={{
                        pathname: '/shift',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Shift"
                    leftIcon={<SvgIcon component={AssignmentIndIcon}/>}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuVaccine')}
                isOpen={state.menuVaccine}
                name="Vaccine"
                icon={<SvgIcon component={LocalHospitalIcon}/>}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/vaccines',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Vaccine Info"
                    leftIcon={<SvgIcon component={RiMedicineBottleFill}/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/categories',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Vaccine Inventory"
                    leftIcon={<SvgIcon component={MdInventory}/>}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuRecipient')}
                isOpen={state.menuRecipient}
                name="Recipient"
                icon={<SvgIcon component={VisitorIcon}/>}
                dense={dense}
            >
                <MenuItemLink
                    to={{
                        pathname: '/recipients',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Recipient List"
                    leftIcon={<SvgIcon component={RiFolderUserFill}/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/appointments',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Appointments"
                    leftIcon={<SvgIcon component={FaCalendarCheck} viewBox="0 0 600 476.6"/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/vaccine/records',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Vaccine Records"
                    leftIcon={<SvgIcon component={RiHistoryFill}/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/invoices',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="Invoices"
                    leftIcon={<SvgIcon component={FaFileInvoiceDollar} viewBox="0 0 500 446.6"/>}
                    dense={dense}
                />
                <MenuItemLink
                    to={{
                        pathname: '/survey/results',
                        state: { _scrollToTop: true },
                    }}
                    primaryText="SurveyResult"
                    leftIcon={<SvgIcon component={FaFileInvoiceDollar} viewBox="0 0 500 446.6"/>}
                    dense={dense}
                />
            </SubMenu>

        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    open: {
        width: 200,
    },
    closed: {
        width: 55,
    },
}));

export default Menu;
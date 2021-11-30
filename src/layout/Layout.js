import React from "react";
import { Layout } from "react-admin";
import AppBar from "./AppBar";
import Menu from './Menu';
import { ProfileProvider } from "../pages/profile/Profile";

const CustomLayout = (props) => (
    <ProfileProvider>
        <Layout {...props} appBar={AppBar} menu={Menu} />
    </ProfileProvider>
);

export default CustomLayout;

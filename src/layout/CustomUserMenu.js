import React from "react";
import { UserMenu, MenuItemLink } from "react-admin";
import SettingsIcon from "@material-ui/icons/Settings";
import { useProfile } from "../pages/profile/Profile";

const CustomUserMenu = (props) => {
    const { profileVersion } = useProfile();

    return (
        <UserMenu key={profileVersion} {...props}>
            <MenuItemLink
                to="/profile"
                primaryText="Profile"
                leftIcon={<SettingsIcon />}
            />
        </UserMenu>
    );
};

export default CustomUserMenu;

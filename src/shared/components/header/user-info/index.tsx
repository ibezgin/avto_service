import _ from "lodash";
import React from "react";
import { Typography, Avatar, Dropdown, Menu } from "antd";
import { UserInfoArrowIcon } from "../../user-info-arrow-icon";
import { SC } from "../styled";
import { useUser } from "../../../hooks/use-user";
// import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import LOGOUT from "../../../gql/authentication/logout.gql";
import CURRENT_USER from "../../../gql/authentication/current-user.gql";
import { Logout } from "gql/types/operation-result-types";
const { Text } = Typography;

export const UserInfo = React.memo(() => {
    const user: any = useUser();

    const { sendLogout } = useLogoutMutation();
    const menu = (
        <Menu
            style={{
                minWidth: 200,
            }}
        >
            <Menu.Item
                onClick={() => {
                    sendLogout();
                }}
            >
                <SC.UserInfoLogout>{"Выйти из аккаунта"}</SC.UserInfoLogout>
            </Menu.Item>
        </Menu>
    );

    // if (!user?.username && user.networkStatus === NetworkStatus.ready) {
    //     return <Redirect to="/login" />;
    // }
    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <div>
                <Avatar style={{ backgroundColor: "#F96406" }} size={48}>
                    {_.toUpper(user?.username || "")}
                </Avatar>
                <Text>{user?.username}</Text>
                <UserInfoArrowIcon />
            </div>
        </Dropdown>
    );
});

function useLogoutMutation() {
    const [mutation, mutationHelper] = useMutation<Logout>(LOGOUT);

    const updateCacheAfterLogin = cache => {
        cache.writeQuery({
            query: CURRENT_USER as any,
            data: {
                authentication: {
                    currentUser: null,
                },
            },
        });
    };

    const sendLogout = () => {
        mutation({
            update: updateCacheAfterLogin,
        });
    };
    return {
        sendLogout,
        loading: mutationHelper.loading,
    };
}

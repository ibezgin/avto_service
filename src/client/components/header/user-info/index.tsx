import _ from "lodash";
import React, { useEffect } from "react";
import { Typography, Avatar, Dropdown, Menu } from "antd";
import { UserInfoArrowIcon } from "../../user-info-arrow-icon";
import { SC } from "../styled";
import { useUser } from "../../../hooks/use-user";
import { Redirect } from "react-router-dom";
import { NetworkStatus, useMutation } from "@apollo/client";
import { Mutation } from "../../../service/types/types";
import { LOGOUT } from "../../../gql/authentication/logout";
import { CURRENT_USER } from "../../../gql/authentication/current-user";
const { Text } = Typography;

export const UserInfo = React.memo(() => {
    const user = useUser();

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

    if (!user?.username && user.networkStatus === NetworkStatus.ready) {
        return <Redirect to="/login" />;
    }
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
    const [mutation, mutationHelper] = useMutation<Mutation>(LOGOUT);

    const updateCacheAfterLogin = (cache, { data }) => {
        cache.writeQuery({
            query: CURRENT_USER,
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

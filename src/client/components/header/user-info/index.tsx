import _ from "lodash";
import React from "react";
import { Typography, Avatar, Dropdown, Menu } from "antd";
import { UserInfoArrowIcon } from "../../user-info-arrow-icon";
import { SC } from "../styled";
const { Text } = Typography;

export const UserInfo = React.memo(() => {
    const userName = ["Daniel", "Lugo"];

    const menu = (
        <Menu
            style={{
                minWidth: 200,
            }}
        >
            <Menu.Item
                onClick={() => {
                    // setLangModalVisible(true);
                }}
            >
                <div>
                    <SC.UserInfoTitle>{"Язык"}</SC.UserInfoTitle>
                    <SC.UserInfoValue>{"Русский"}</SC.UserInfoValue>
                </div>
            </Menu.Item>

            <Menu.Item
                onClick={() => {
                    // asd
                }}
            >
                <SC.UserInfoLogout>{"Выйти из аккаунта"}</SC.UserInfoLogout>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} placement="bottomRight">
            <div>
                <Avatar style={{ backgroundColor: "#F96406" }} size={48}>
                    {_.toUpper(`${userName[0] || ""}${userName[1] || ""}`)}
                </Avatar>
                <Text>{userName}</Text>
                <UserInfoArrowIcon />
            </div>
        </Dropdown>
    );
});

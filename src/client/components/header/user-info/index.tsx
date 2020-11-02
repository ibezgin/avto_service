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
                    <SC.UserInfoValue>Русский</SC.UserInfoValue>
                </div>
            </Menu.Item>
            <Menu.Item
                onClick={() => {
                    // setTimeZoneModalVisible(true);
                }}
            >
                <div>
                    <SC.UserInfoTitle>{"Временная зона"}</SC.UserInfoTitle>
                    <SC.UserInfoValue>{/* <Timer /> */}</SC.UserInfoValue>
                </div>
            </Menu.Item>
            {/* <Menu.Item disabled={true}>
                <div>
                    <SC.UserInfoTitle>{__("Тема")}</SC.UserInfoTitle>
                    <SC.UserInfoValue>
                        {__("Тёмный интерфейс")}
                    </SC.UserInfoValue>
                </div>
            </Menu.Item> */}
            <Menu.Item
                onClick={() => {
                    // / some
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

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router";
import { SC } from "./styled";
import { UserInfo } from "./user-info";
const { Header } = Layout;

interface IProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

export const HeaderWrapper = React.memo((props: IProps) => {
    const { collapsed, setCollapsed } = props;

    return (
        <>
            <Header
                id="app-header"
                className="site-layout-background"
                style={{ padding: 0 }}
            >
                <SC.Header>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setCollapsed(!collapsed),
                        },
                    )}
                    <Switch>
                        {/* {header} */}
                        <Route
                            path={""}
                            exact={false}
                            component={() => (
                                <>
                                    <div></div>
                                    <div></div>
                                </>
                            )}
                        />
                    </Switch>
                    <SC.UserInfo>
                        <UserInfo />
                    </SC.UserInfo>
                </SC.Header>
            </Header>
        </>
    );
});

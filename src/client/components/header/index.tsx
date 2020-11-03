import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router";
import { useRoutes } from "../../hooks/use-routes";
import { SC } from "./styled";
import { UserInfo } from "./user-info";
const { Header } = Layout;

interface IProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
}

export const HeaderWrapper = React.memo((props: IProps) => {
    const { collapsed, setCollapsed } = props;

    const routes = useRoutes();
    const headerRoutes = [];
    for (const category of routes) {
        for (const menuItem of category.children) {
            if (menuItem.header) {
                headerRoutes.push(menuItem);
            }
        }
    }

    return (
        <>
            <Header id="app-header" className="site-layout-background">
                <SC.Header>
                    {/* <div>
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: () => setCollapsed(!collapsed),
                            },
                        )}
                        <div></div>
                    </div> */}
                    <Switch>
                        {headerRoutes.map((route, indexRoute) => (
                            <Route
                                path={route.path}
                                key={`route-${indexRoute}`}
                                exact={route.exact}
                            >
                                <div></div>
                                <route.header />
                                <div></div>
                            </Route>
                        ))}
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
                    <div>
                        <SC.UserInfo>
                            <UserInfo />
                        </SC.UserInfo>
                    </div>
                </SC.Header>
            </Header>
        </>
    );
});

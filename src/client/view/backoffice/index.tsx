import { Layout } from "antd";
import { ReactNode, useCallback, useState } from "react";
import "antd/dist/antd.less";
import { BackofficeMenu } from "./menu";
import React from "react";
import { HeaderWrapper } from "../../components/header";
// import { FunctionComponent } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { SC } from "./styled";
interface IProps {
    children?: ReactNode;
}

const { Sider, Content } = Layout;

export const AppTemplate = React.memo((props: IProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const memoizedSetCollapsed = useCallback((value: boolean) => {
        setCollapsed(value);
    }, []);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <img src={"/assets/images/logo.png"} width={60} />
                </div>
                <BackofficeMenu />
            </Sider>
            {/* {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                },
            )} */}
            <Layout className="site-layout">
                <HeaderWrapper
                    collapsed={collapsed}
                    setCollapsed={memoizedSetCollapsed}
                />
                <Content
                    style={{
                        overflow: "auto",
                    }}
                    className="site-layout-background"
                >
                    <SC.Content>{props.children}</SC.Content>
                </Content>
            </Layout>
        </Layout>
    );
});

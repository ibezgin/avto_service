import { Layout } from "antd";
import { Formik } from "formik";
import React from "react";
import * as FormikAntd from "formik-antd";
import { SC } from "./styled";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const LoginPage = React.memo(() => {
    return (
        <Layout>
            <Layout className="site-layout">
                <SC.LoginForm>
                    <h2 style={{ textAlign: "center" }}>Service.Auto</h2>

                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                        }}
                        onSubmit={() => {
                            // void
                        }}
                    >
                        {() => {
                            return (
                                <FormikAntd.Form>
                                    <FormikAntd.Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your username!",
                                            },
                                        ]}
                                    >
                                        <FormikAntd.Input
                                            prefix={
                                                <UserOutlined className="site-form-item-icon" />
                                            }
                                            name="username"
                                            placeholder="Username"
                                        />
                                    </FormikAntd.Form.Item>
                                    <FormikAntd.Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <FormikAntd.Input
                                            prefix={
                                                <LockOutlined className="site-form-item-icon" />
                                            }
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </FormikAntd.Form.Item>

                                    <FormikAntd.Form.Item name="submit">
                                        <FormikAntd.SubmitButton
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button"
                                        >
                                            Submit
                                        </FormikAntd.SubmitButton>
                                    </FormikAntd.Form.Item>
                                </FormikAntd.Form>
                            );
                        }}
                    </Formik>
                </SC.LoginForm>
            </Layout>
        </Layout>
    );
});

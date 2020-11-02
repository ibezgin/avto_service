import { Input, Modal, Typography } from "antd";
import React from "react";
import * as FormikAntd from "formik-antd";
import { Formik } from "formik";
import { useDictionaryBrandHelper } from "../helper";

const { Title } = Typography;

interface IProps {
    visible: boolean;
    setVisible: (state: boolean) => void;
}

export const DictionaryBrandModal = React.memo((props: IProps) => {
    const { visible, setVisible } = props;

    const { sendAddBrand } = useDictionaryBrandHelper();

    return (
        <Modal
            visible={visible}
            onCancel={() => {
                setVisible(false);
            }}
            footer={null}
        >
            <Formik
                initialValues={{
                    title: "",
                }}
                enableReinitialize={true}
                onSubmit={({ title }) => {
                    sendAddBrand(title);
                }}
            >
                {() => {
                    return (
                        <FormikAntd.Form layout="vertical">
                            <Title level={4}>{"Добавить бренд"}</Title>
                            <FormikAntd.FormItem
                                name={"title"}
                                label={"Название"}
                            >
                                <FormikAntd.Input
                                    name={"title"}
                                    placeholder={"Название"}
                                    type="text"
                                    autoComplete="off"
                                    autoCapitalize="off"
                                    autoCorrect="off"
                                />
                            </FormikAntd.FormItem>
                            <FormikAntd.SubmitButton
                                loading={false}
                                block={true}
                            >
                                Сохранить
                            </FormikAntd.SubmitButton>
                        </FormikAntd.Form>
                    );
                }}
            </Formik>
        </Modal>
    );
});

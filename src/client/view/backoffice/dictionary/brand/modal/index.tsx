import { Modal, Typography } from "antd";
import React, { ReactNode, useState } from "react";
import * as FormikAntd from "formik-antd";
import { Formik } from "formik";
import { useDictionaryBrandHelper } from "../helper";
// eslint-disable-next-line @typescript-eslint/camelcase

const { Title } = Typography;

interface IProps {
    children: (setVisible: (state: boolean) => void) => ReactNode;
    id?: string;
    titleBrand?: string;
}

export const DictionaryBrandModal = React.memo((props: IProps) => {
    const [visible, setVisible] = useState<boolean>(false);
    const { id, titleBrand } = props;
    const { sendAddBrand, sendUpdateBrand } = useDictionaryBrandHelper();

    return (
        <>
            <Modal
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                footer={null}
            >
                <Formik
                    initialValues={{
                        title: titleBrand || "",
                    }}
                    enableReinitialize={true}
                    onSubmit={({ title }) => {
                        if (id) {
                            sendUpdateBrand(id, title, setVisible);
                            return;
                        }
                        sendAddBrand(title, setVisible);
                    }}
                >
                    {() => {
                        return (
                            <FormikAntd.Form layout="vertical">
                                <Title level={4}>
                                    {id ? "Редактировать" : "Добавить бренд"}
                                </Title>
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
            {props.children(setVisible)}
        </>
    );
});
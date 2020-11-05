import React, { ReactNode, useState } from "react";
import * as FormikAntd from "formik-antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import { Typography } from "antd";
import { useServiceHelper } from "../helper";

const { Title } = Typography;

interface IEditOption {
    id: string;
    title: string;
    price: string;
}

interface IProps {
    edit?: IEditOption;
    children: (setVisible: (state: boolean) => void) => ReactNode;
}

export const DictionaryServiceModal = React.memo((props: IProps) => {
    const { edit } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const { sendAddService, sendUpdateService } = useServiceHelper();

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
                        title: edit?.title || "",
                        price: edit?.price || "",
                    }}
                    enableReinitialize={true}
                    onSubmit={(values, { resetForm }) => {
                        if (edit) {
                            sendUpdateService(
                                edit.id,
                                values.title,
                                Number(values.price),
                            );
                            setVisible(false);
                            return;
                        }
                        sendAddService(values.title, Number(values.price));
                        setVisible(false);
                        resetForm();
                    }}
                >
                    {() => {
                        return (
                            <FormikAntd.Form layout="vertical">
                                <Title level={4}>
                                    {edit?.id
                                        ? "Редактировать"
                                        : "Добавить услугу"}
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
                                        required
                                    />
                                </FormikAntd.FormItem>
                                <FormikAntd.FormItem
                                    name={"price"}
                                    label={"Цена"}
                                >
                                    <FormikAntd.Input
                                        name={"price"}
                                        placeholder={"Цена"}
                                        type="number"
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        required
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

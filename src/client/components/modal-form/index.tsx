import Modal from "antd/lib/modal/Modal";
import { Formik, FormikHelpers } from "formik";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import * as FormikAntd from "formik-antd";
import { Typography } from "antd";

const { Title } = Typography;

type FormFieldType =
    | "textField"
    | "numberField"
    | "selectField"
    | "checkboxField";

type IField = {
    [key in FormFieldType]: any;
};

interface IFormikValues {
    [key: string]: any;
}

interface IOptions {
    label: string | number;
    value: string | number;
}

export interface IFormField {
    title: string;
    name: string;
    type: FormFieldType;
    options?: IOptions[];
}

interface IProps {
    edit?: IFormikValues;
    onSubmit: (
        values: IFormikValues,
        formikHelpers: FormikHelpers<IFormikValues>,
    ) => void;
    formFields: IFormField[];
    children: (setVisible: (state: boolean) => void) => ReactNode;
}
export const ModalForm = React.memo((props: IProps) => {
    const { edit } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const checkField = (field: IFormField) => {
        const fields: IField = {
            textField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Input
                        name={field.name}
                        placeholder={field.title}
                        type="text"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        required
                    />
                </FormikAntd.FormItem>
            ),
            numberField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Input
                        name={field.name}
                        placeholder={field.title}
                        type="number"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        required
                    />
                </FormikAntd.FormItem>
            ),
            selectField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Select
                        name={field.name}
                        placeholder={field.title}
                        dropdownMatchSelectWidth={false}
                        allowClear={false}
                    >
                        {(field?.options || []).map(elem => (
                            <FormikAntd.Select.Option
                                key={`modal-form-option-${String(elem?.value)}`}
                                value={String(elem?.value)}
                            >
                                {elem?.label}
                            </FormikAntd.Select.Option>
                        ))}
                    </FormikAntd.Select>
                </FormikAntd.FormItem>
            ),
            checkboxField: (
                <FormikAntd.FormItem name={field.name} label={field.title}>
                    <FormikAntd.Checkbox name={field.name} />
                </FormikAntd.FormItem>
            ),
        };

        return fields[field.type];
    };

    const formFields = useCallback(
        () => props.formFields.map(elem => checkField(elem)),
        [props.formFields],
    );

    const initialValues = useMemo(() => {
        const addValues = props.formFields.map(elem => ({ [elem.name]: "" }));
        return { setVisible, ...(edit ? edit : addValues) };
    }, [edit, props.formFields]);

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
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={props.onSubmit}
                >
                    {() => {
                        return (
                            <FormikAntd.Form layout="vertical">
                                <Title level={4}>
                                    {edit?.id ? "Редактировать" : "Добавить"}
                                </Title>
                                {formFields()}
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

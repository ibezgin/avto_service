import React, { ReactNode, useMemo, useState } from "react";
import * as FormikAntd from "formik-antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import { Typography } from "antd";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../../brand/gql/all-brands";
import { Query } from "../../../../../service/types/types";
import { useQuery } from "@apollo/client";
import { useModelsHelper } from "../helper";
import _ from "lodash";

const { Title } = Typography;

interface IEditOption {
    id: string;
    title: string;
    brandId: string;
}

interface IProps {
    edit?: IEditOption;
    children: (setVisible: (state: boolean) => void) => ReactNode;
}

export const DictionaryModelsModal = React.memo((props: IProps) => {
    const { edit } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const allBrandsQuery = useQuery<Query>(All_BRAND);

    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const { sendAddModel, validateForm, sendUpdateModel } = useModelsHelper();

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
                        brandId: edit?.brandId || "",
                    }}
                    enableReinitialize={true}
                    onSubmit={(values, { resetForm }) => {
                        const isValid = validateForm(values);
                        if (isValid) {
                            if (!edit) {
                                sendAddModel(values.title, values.brandId);
                                setVisible(false);
                                return;
                            }
                            sendUpdateModel({
                                id: edit.id,
                                ..._.pick(values, ["title", "brandId"]),
                            });
                            setVisible(false);
                            resetForm();
                        }
                    }}
                >
                    {() => {
                        return (
                            <FormikAntd.Form layout="vertical">
                                <Title level={4}>
                                    {edit?.id
                                        ? "Редактировать"
                                        : "Добавить модель"}
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
                                <FormikAntd.FormItem
                                    name={"brandId"}
                                    label={"Марка автомобиля"}
                                >
                                    <FormikAntd.Select
                                        name={"brandId"}
                                        placeholder={"Марка автомобиля"}
                                        dropdownMatchSelectWidth={false}
                                        allowClear={false}
                                    >
                                        {allBrand.map(elem => (
                                            <FormikAntd.Select.Option
                                                key={String(elem?.id)}
                                                value={String(elem?.id)}
                                            >
                                                {elem?.title}
                                            </FormikAntd.Select.Option>
                                        ))}
                                    </FormikAntd.Select>
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

import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { ALL_MODELS } from "./gql/all-models";
import { Query } from "../../../../service/types/types";
import { useQuery } from "@apollo/client";
import { useModelsHelper } from "./helper";
import _ from "lodash";
import { ModalForm } from "../../../../components/modal-form";

const { confirm } = Modal;

export const DictionaryModels = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allModelsQuery = useQuery<Query>(ALL_MODELS);

    const allModels = useMemo(
        () => allModelsQuery.data?.models.allModels || [],
        [allModelsQuery.data?.models.allModels],
    );

    const {
        sendDeleteModel,
        helperLoading,
        sendUpdateModel,
        formFields,
        allBrand,
        validateForm,
    } = useModelsHelper();

    const columns = useMemo(
        () => [
            {
                title: "Модель",
                dataIndex: "title",
            },
            {
                title: "Марка",
                dataIndex: "brandId",
                render: (brandId: string) =>
                    allBrand.find(elem => elem.id === brandId).title,
            },
            {
                title: "",
                dataIndex: "edit",
                render: (edit: any, record: any) => (
                    <>
                        <ModalForm
                            edit={_.pick(record, ["id", "title", "brandId"])}
                            formFields={formFields}
                            onSubmit={values => {
                                const isValid = validateForm(values);
                                if (isValid) {
                                    sendUpdateModel({
                                        id: edit.id,
                                        ..._.pick(values, ["title", "brandId"]),
                                    });
                                    values.setVisible(false);
                                }
                            }}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={styleUtils.cursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </ModalForm>
                        <DeleteOutlined
                            style={styleUtils.cursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteModel(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [
            allBrand,
            formFields,
            sendDeleteModel,
            sendUpdateModel,
            styleUtils.cursorPointer,
            validateForm,
        ],
    );

    const loading = helperLoading || allModelsQuery.loading;

    return (
        <>
            <Table columns={columns} dataSource={allModels} loading={loading} />
        </>
    );
});

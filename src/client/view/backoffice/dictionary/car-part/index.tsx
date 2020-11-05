import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ModalForm, IFormField } from "../../../../components/modal-form";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { useQuery } from "@apollo/client";
import { Query } from "../../../../service/types/types";
import { ALL_CAR_PARTS } from "./gql/all-car-parts";
import { useCarPartHelper } from "./helper";

const { confirm } = Modal;

export const formFields: IFormField[] = [
    {
        title: "Название",
        name: "title",
        type: "textField",
    },
    {
        title: "Цена",
        name: "price",
        type: "numberField",
    },
];

export const DictionaryCarPart = React.memo(() => {
    const { cursorPointer } = useStyleUtils();

    const allCarPartsQuery = useQuery<Query>(ALL_CAR_PARTS);

    const allCarParts = useMemo(
        () => allCarPartsQuery.data?.carPart.allCarParts || [],
        [allCarPartsQuery.data?.carPart.allCarParts],
    );

    const { sendUpdateCarPart, sendDeleteCarPart } = useCarPartHelper();

    const columns = useMemo(
        () => [
            {
                title: "Название",
                dataIndex: "title",
            },
            {
                title: "Цена",
                dataIndex: "price",
            },
            {
                title: "",
                dataIndex: "edit",
                render: (edit: any, record: any) => (
                    <>
                        <ModalForm
                            formFields={formFields}
                            edit={record}
                            onSubmit={values => {
                                sendUpdateCarPart(
                                    values.id,
                                    values.title,
                                    values.price,
                                );
                                values.setVisible(false);
                            }}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={cursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </ModalForm>

                        <DeleteOutlined
                            style={cursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteCarPart(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [cursorPointer, sendDeleteCarPart, sendUpdateCarPart],
    );
    return (
        <Table
            columns={columns}
            dataSource={allCarParts}
            loading={allCarPartsQuery.loading}
        />
    );
});

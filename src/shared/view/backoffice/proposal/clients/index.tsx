import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { useGenerateCode } from "../../../../hooks/use-generate-tempory-code";
import { Query } from "../../../../service/types/types";
import { ALL_CLIENTS } from "./gql/all-clients";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formFields, useClientsHelper } from "./helper";
import _ from "lodash";
import { ModalForm } from "../../../../components/modal-form";
import { TableDateTime } from "../../../../components/table-date-time";

const { confirm } = Modal;

export const ProposalClients = React.memo(() => {
    const allClientsQuery = useQuery<Query>(ALL_CLIENTS);

    const { generateTemporyCode } = useGenerateCode();

    const allClients = useMemo(
        () =>
            allClientsQuery.data?.clients.allClients.map(elem => ({
                ...elem,
                key: generateTemporyCode(),
            })) || [],
        [allClientsQuery.data?.clients.allClients, generateTemporyCode],
    );

    const {
        sendUpdateClient,
        sendDeleteClient,
        mutationLoading,
    } = useClientsHelper();

    const loading = allClientsQuery.loading || mutationLoading;

    const columns = [
        {
            dataIndex: "firstName",
            title: "Имя",
        },
        {
            dataIndex: "lastName",
            title: "Фамилия",
        },
        {
            dataIndex: "phone",
            title: "Номер телефона",
            render: (phone: string) => <a href={`tel:${phone}`}>{phone}</a>,
        },
        {
            dataIndex: "createTime",
            title: "Дата добавления",
            render: (createTime: any) => (
                <TableDateTime date={1000 * createTime} />
            ),
        },
        {
            dataIndex: "edit",
            title: "",
            render: (edit: any, record: any) => (
                <ModalForm
                    onSubmit={values => {
                        sendUpdateClient(
                            record.id,
                            _.pick(values, [
                                "firstName",
                                "lastName",
                                "phone",
                                "createTime",
                            ]),
                        );
                        values.setVisible();
                    }}
                    edit={record}
                    formFields={formFields}
                    loading={mutationLoading}
                >
                    {setVisible => (
                        <EditOutlined
                            onClick={() => {
                                setVisible(true);
                            }}
                        />
                    )}
                </ModalForm>
            ),
        },
        {
            dataIndex: "delete",
            title: "",
            render: (del: any, record: any) => (
                <DeleteOutlined
                    onClick={() => {
                        confirm({
                            title: `Подтвердите удаление [${record.firstName} ${record.lastName}]`,
                            onOk: () => {
                                sendDeleteClient(record.id);
                            },
                        });
                    }}
                />
            ),
        },
    ];
    return (
        <Table columns={columns} dataSource={allClients} loading={loading} />
    );
});

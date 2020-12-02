import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { ModalForm } from "../../../../components/modal-form";
import { Query } from "../../../../service/types/types";
import { ALL_CARS } from "./gql/all-cars";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCarsHelper } from "./helper";
import { ALL_MODELS } from "../../dictionary/models/gql/all-models";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../../dictionary/brand/gql/all-brands";
import { ALL_CLIENTS } from "../clients/gql/all-clients";
import _ from "lodash";
import { TableClientInfo } from "../../../../components/table-client-info";

const { confirm } = Modal;

export const ProposalCars = React.memo(() => {
    const allCarsQuery = useQuery<Query>(ALL_CARS);

    const allCars = useMemo(() => allCarsQuery.data?.cars.allCars, [
        allCarsQuery.data?.cars.allCars,
    ]);

    const allClientsQuery = useQuery<Query>(ALL_CLIENTS);

    const allBrandQuery = useQuery<Query>(All_BRAND);

    const allModelsQuery = useQuery<Query>(ALL_MODELS);

    const allClients = useMemo(
        () => allClientsQuery.data?.clients.allClients || [],
        [allClientsQuery.data?.clients.allClients],
    );

    const allBrand = useMemo(() => allBrandQuery.data?.brand.allBrands || [], [
        allBrandQuery.data?.brand.allBrands,
    ]);

    const allModels = useMemo(
        () => allModelsQuery.data?.models.allModels || [],
        [allModelsQuery.data?.models.allModels],
    );

    const {
        mutationLoading,
        formFields,
        setBrandState,
        sendDeleteCar,
        sendUpdateCar,
    } = useCarsHelper();

    const columns = [
        {
            dataIndex: "clientId",
            title: "Клиент",
            render: (clientId: any) => {
                const client = allClients?.find(elem => elem.id === clientId);
                return (
                    <TableClientInfo
                        nameAndLastName={`${client?.firstName} ${client?.lastName}`}
                        phoneNumber={client?.phone}
                    />
                );
            },
        },
        {
            dataIndex: "brandId",
            title: "Марка авто",
            render: (brandId: any) =>
                allBrand.find(elem => elem.id === brandId)?.title,
        },
        {
            dataIndex: "modelId",
            title: "Модель",
            render: (modelId: any) =>
                allModels.find(elem => elem.id === modelId)?.title,
        },
        {
            dataIndex: "gosNumber",
            title: "Гос номер",
        },
        {
            dataIndex: "color",
            title: "Цвет",
        },
        {
            dataIndex: "edit",
            title: "",
            render: (edit: any, record: any) => {
                return (
                    <ModalForm
                        onSubmit={values => {
                            sendUpdateCar(
                                record.id,
                                _.pick(values, [
                                    "brandId",
                                    "modelId",
                                    "clientId",
                                    "gosNumber",
                                    "color",
                                ]),
                            );
                            values.setVisible();
                        }}
                        edit={record}
                        formFields={formFields}
                        loading={mutationLoading}
                    >
                        {(setVisible, values) => {
                            return (
                                <EditOutlined
                                    onClick={() => {
                                        setBrandState(values?.brandId);
                                        setVisible(true);
                                    }}
                                />
                            );
                        }}
                    </ModalForm>
                );
            },
        },
        {
            dataIndex: "delete",
            title: "",
            render: (del: any, record: any) => (
                <DeleteOutlined
                    onClick={() => {
                        confirm({
                            title: `Подтвердите удаление [${record.gosNumber}]`,
                            onOk: () => {
                                sendDeleteCar(record.id);
                            },
                        });
                    }}
                />
            ),
        },
    ];

    return <Table columns={columns} dataSource={allCars} />;
});

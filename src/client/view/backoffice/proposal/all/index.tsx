import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useMemo } from "react";
import { Query } from "../../../../service/types/types";
import { ALL_PROPOSALS } from "./gql/all-proposals";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { TableDateTime } from "../../../../components/table-date-time";
import { StatusColorTag } from "../../../../components/status-color-tag";
import { ALL_USERS } from "../../dictionary/users/gql/all-users";
import { ALL_CLIENTS } from "../clients/gql/all-clients";
import { ALL_MODELS } from "../../dictionary/models/gql/all-models";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../../dictionary/brand/gql/all-brands";
import { Specialization } from "../../../../service/enums/specialization";
import { TableClientInfo } from "../../../../components/table-client-info";
import { ALL_CARS } from "../cars/gql/all-cars";
import { Filter } from "../../../../components/filter";

export const ProposalAll = React.memo(() => {
    const history = useHistory();

    // const allProposalsQuery = useQuery<Query>(ALL_PROPOSALS, {
    //     fetchPolicy: "network-only",
    // });

    const allUsersQuery = useQuery<Query>(ALL_USERS);

    const allClientsQuery = useQuery<Query>(ALL_CLIENTS);

    const allModelsQuery = useQuery<Query>(ALL_MODELS);

    const allBrandsQuery = useQuery<Query>(All_BRAND);

    const allCarsQuery = useQuery<Query>(ALL_CARS);

    const technicalUsers = useMemo(
        () =>
            allUsersQuery.data?.users.allUsers.filter(
                elem => elem.position === Specialization.TECHNICAL,
            ),
        [allUsersQuery.data?.users.allUsers],
    );

    const allClients = useMemo(() => allClientsQuery.data?.clients.allClients, [
        allClientsQuery.data?.clients.allClients,
    ]);

    const allModels = useMemo(() => allModelsQuery.data?.models.allModels, [
        allModelsQuery.data?.models.allModels,
    ]);
    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const allCars = useMemo(() => allCarsQuery.data?.cars.allCars, [
        allCarsQuery.data?.cars.allCars,
    ]);

    // useEffect(() => {
    //     allProposalsQuery.startPolling(5000);
    // }, [allProposalsQuery]);
    const columns = [
        {
            dataIndex: "createTime",
            title: "Дата создания",
            render: (createTime: any) => (
                <TableDateTime date={1000 * createTime} />
            ),
        },
        {
            dataIndex: "changeTime",
            title: "Дата последнего изменения",
            render: (changeTime: any) => (
                <TableDateTime date={1000 * changeTime} />
            ),
        },
        {
            dataIndex: "status",
            title: "Статус",
            render: (status: any) => <StatusColorTag status={status} />,
        },
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
            dataIndex: "carId",
            title: "Авто",
            render: (carId: any) => {
                const car = allCars?.find(elem => elem.id === carId);
                const brand = allBrand?.find(elem => elem.id === car?.brandId)
                    ?.title;
                const model = allModels?.find(elem => elem.id === car?.modelId)
                    ?.title;
                return (
                    <span>
                        {brand} {model}
                    </span>
                );
            },
        },
        {
            dataIndex: "userId",
            title: "Технический специалист",
            render: (userId: any) => {
                const user = technicalUsers?.find(elem => elem.id === userId);

                return (
                    <span>
                        {user?.firstname} {user?.lastname}
                    </span>
                );
            },
        },
        {
            dataIndex: "edit",
            title: "",
            render: (edit: any, record: any) => (
                <EditOutlined
                    onClick={() => {
                        history.push(`/proposal/form?id=${record.id}`);
                    }}
                />
            ),
        },
    ];

    return (
        <Filter<Query>
            filterItems={["assignedToMe", "clientId"]}
            query={ALL_PROPOSALS}
        >
            {({ data, loading }, { pagination }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const allProposals = useMemo(
                    () => data?.proposal.allProposals || [],
                    [data?.proposal.allProposals],
                );
                return (
                    <Table
                        showHeader={true}
                        columns={columns}
                        dataSource={allProposals}
                        loading={loading}
                        size="small"
                        scroll={{
                            x: true,
                        }}
                        pagination={pagination}
                    />
                );
            }}
        </Filter>
    );
});

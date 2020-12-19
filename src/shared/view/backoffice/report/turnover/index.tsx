import React, { useCallback, useMemo } from "react";
import { Filter } from "components/filter";
import EVERY_DAY from "./gql/every-day.gql";
import {
    AllUsers,
    AllClients,
    AllModels,
    AllBrand,
    AllCars,
    ReportEveryDay_reportEveryDay_report_proposals,
    ReportTurnover,
    ReportTurnover_reportTurnover_report_transactions,
} from "gql/types/operation-result-types";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    YAxis,
    Legend,
    ResponsiveContainer,
    Line,
} from "recharts";
import { Table, Spin } from "antd";
import { useQuery } from "@apollo/client";
import { Specialization } from "service/enums/specialization";
import { TableDateTime } from "components/table-date-time";
import { NumberFormatter } from "components/number-formatter";
import ALL_USERS from "../../dictionary/users/gql/all-users.gql";
import ALL_CLIENTS from "../../proposal/clients/gql/all-clients.gql";
import ALL_MODELS from "../../dictionary/models/gql/all-models.gql";
import All_BRAND from "../../dictionary/brand/gql/all-brands.gql";
import ALL_CARS from "../../proposal/cars/gql/all-cars.gql";
import { useHistory } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { useHasWindow } from "hooks/use-has-window";
import { useFormat } from "hooks/use-format";

interface IProps {
    transactions: ReportTurnover_reportTurnover_report_transactions[];
}
const ExpandableSubTable = React.memo((props: IProps) => {
    const history = useHistory();

    const hasWindow = useHasWindow();

    const transactions = useMemo(() => props.transactions || [], [
        props.transactions,
    ]);
    const { addZeroToId } = useFormat();

    const allUsersQuery = useQuery<AllUsers>(ALL_USERS);

    const allClientsQuery = useQuery<AllClients>(ALL_CLIENTS);

    const allModelsQuery = useQuery<AllModels>(ALL_MODELS);

    const allBrandsQuery = useQuery<AllBrand>(All_BRAND);

    const allCarsQuery = useQuery<AllCars>(ALL_CARS);

    const technicalUsers = useMemo(
        () =>
            allUsersQuery.data?.users.allUsers?.filter(
                elem => elem?.position === Specialization.TECHNICAL,
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

    const columns = [
        {
            dataIndex: "proposal",
            title: "Номер заявки",
            render: (proposal: any) =>
                addZeroToId(String(proposal.proposal_id) || ""),
        },
        {
            dataIndex: "proposal",
            title: "Дата",
            render: (proposal: any) => (
                <TableDateTime date={1000 * proposal.changeTime} />
            ),
        },
        {
            dataIndex: "amount",
            title: "Сумма",
            render: (amount: any) => {
                return <NumberFormatter numb={amount} />;
            },
        },
        {
            dataIndex: "edit",
            title: "",
            render: (_edit: any, record: any) => (
                <EditOutlined
                    onClick={() => {
                        history.push(`/proposal/form?id=${record.proposal.id}`);
                    }}
                />
            ),
        },
    ];

    const loading = useMemo(() => {
        if (hasWindow) {
            return (
                allUsersQuery.loading ||
                allClientsQuery.loading ||
                allModelsQuery.loading ||
                allBrandsQuery.loading ||
                allCarsQuery.loading ||
                allClientsQuery.loading
            );
        }
        return false;
    }, [
        allBrandsQuery.loading,
        allCarsQuery.loading,
        allClientsQuery.loading,
        allModelsQuery.loading,
        allUsersQuery.loading,
        hasWindow,
    ]);
    return (
        <Table
            columns={columns}
            dataSource={transactions}
            size="small"
            scroll={{
                x: true,
            }}
            pagination={false}
            loading={loading}
        />
    );
});

export const ReportTurnoverComponent = React.memo(() => {
    const hasWindow = useHasWindow();

    const expandedRowRender = useCallback(record => {
        return <ExpandableSubTable transactions={record.transactions} />;
    }, []);

    const expandable = useMemo(() => ({ expandedRowRender }), [
        expandedRowRender,
    ]);

    return (
        <Filter<ReportTurnover>
            filterItems={[]}
            query={EVERY_DAY}
            skip={false}
            withoutButton={true}
            fetchPolicy={"cache-and-network"}
        >
            {({ data, loading }, { pagination }) => {
                const result = data?.reportTurnover.report || [];

                const columns = [
                    {
                        dataIndex: "date",
                        title: "Дата",
                    },
                    {
                        dataIndex: "dayAmount",
                        title: "Сумма",
                        render: (dayAmount: number) => (
                            <NumberFormatter numb={dayAmount} />
                        ),
                    },
                    {
                        dataIndex: "count",
                        title: "Количество оплаченных заявок за день",
                    },
                ];

                const loadState = hasWindow && loading;

                return (
                    <>
                        <Spin spinning={loadState}>
                            <Table
                                dataSource={result}
                                columns={columns}
                                size="small"
                                expandable={expandable}
                                pagination={pagination}
                            />
                            <ResponsiveContainer
                                height="100%"
                                width="100%"
                                aspect={8.0 / 2.0}
                            >
                                <LineChart
                                    data={result}
                                    margin={{ top: 5, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        name={"Количество оплаченных заявок"}
                                        stroke="#f45b5b"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="dayAmount"
                                        name={"Общая сумма за день"}
                                        stroke="#1d2480"
                                        activeDot={{ r: 8 }}
                                    />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </Spin>
                    </>
                );
            }}
        </Filter>
    );
});

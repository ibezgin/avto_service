import React from "react";
import { Filter } from "components/filter";
import EVERY_DAY from "./gql/every-day.gql";
import { ReportEveryDay } from "gql/types/operation-result-types";
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
import moment from "moment";
import { Table } from "antd";
export const ReportEveryDayComponent = React.memo(() => {
    return (
        <Filter<ReportEveryDay> filterItems={[]} query={EVERY_DAY} skip={true}>
            {({ data }) => {
                const result =
                    data?.reportEveryDay.report.map(elem => ({
                        ...elem,
                        key: moment(elem.key * 1000).format("YYYY-MM-DD"),
                    })) || [];

                const columns = [
                    {
                        dataIndex: "key",
                        title: "Дата",
                    },
                    {
                        dataIndex: "value",
                        title: "Количество",
                    },
                ];
                return (
                    <>
                        <Table
                            dataSource={result}
                            columns={columns}
                            size="small"
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
                                <XAxis dataKey="key" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    name={"Количество заявок"}
                                    stroke="#f45b5b"
                                    activeDot={{ r: 8 }}
                                />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                );
            }}
        </Filter>
    );
});

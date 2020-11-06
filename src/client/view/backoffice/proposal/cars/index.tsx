import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useMemo } from "react";
import { Query } from "../../../../service/types/types";
import { ALL_CARS } from "./gql/all-cars";

export const ProposalCars = React.memo(() => {
    const allCarsQuery = useQuery<Query>(ALL_CARS);

    const allCars = useMemo(() => allCarsQuery.data?.cars.allCars, [
        allCarsQuery.data?.cars.allCars,
    ]);

    const columns = [
        {
            dataIndex: "clientId",
            title: "Клиент",
        },
        {
            dataIndex: "brandId",
            title: "Марка авто",
        },
        {
            dataIndex: "modelId",
            title: "Модель",
        },
        {
            dataIndex: "gosNumber",
            title: "Гос номер",
        },
        {
            dataIndex: "color",
            title: "Цвет",
        },
    ];

    return <Table columns={columns} dataSource={allCars} />;
});

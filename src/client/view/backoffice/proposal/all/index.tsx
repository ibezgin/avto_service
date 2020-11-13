import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useMemo } from "react";
import { Query } from "../../../../service/types/types";
import { ALL_PROPOSALS } from "./gql/all-proposals";

export const ProposalAll = React.memo(() => {
    const allProposalsQuery = useQuery<Query>(ALL_PROPOSALS);
    const columns = [
        {
            dataIndex: "createTime",
            title: "Дата создания",
        },
        {
            dataIndex: "changeTime",
            title: "Дата последнего изменения",
        },
        {
            dataIndex: "status",
            title: "Статус",
        },
        {
            dataIndex: "clientId",
            title: "Клиент",
        },
        {
            dataIndex: "auto",
            title: "Авто",
        },
        {
            dataIndex: "userId",
            title: "Технический специалист",
        },
        {
            dataIndex: "userId",
            title: "Технический специалист",
        },
    ];

    // const allProposals = useMemo(()=>allProposalsQuery.data?.pr,[])
    return <Table columns={columns} dataSource={[]} />;
});

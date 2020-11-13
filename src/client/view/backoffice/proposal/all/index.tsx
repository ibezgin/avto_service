import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useMemo } from "react";
import { Query } from "../../../../service/types/types";
import { ALL_PROPOSALS } from "./gql/all-proposals";
import { EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export const ProposalAll = React.memo(() => {
    const history = useHistory();

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

    const allProposals = useMemo(
        () => allProposalsQuery.data?.proposal.allProposals || [],
        [allProposalsQuery.data?.proposal.allProposals],
    );
    return <Table columns={columns} dataSource={allProposals} />;
});

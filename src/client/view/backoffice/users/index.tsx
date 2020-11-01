import { Button, notification, Table } from "antd";

import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Form } from "antd";
import { useCallback } from "react";
import { useMemo } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";

const { confirm } = Modal;

export const Users = React.memo(() => {
    const { isLoading, data, refetch } = useQuery(
        "fetchLuke",
        async () => await axios.get("/api/users"),
    );
    const addNewUser = useAddNewUser(refetch);
    const deleteUser = useDeleteUser(refetch);
    const memoizedData = useMemo(() => data?.data || [], [data]);

    const columns = [
        {
            title: "id",
            dataIndex: "_id",
        },
        {
            title: "username",
            dataIndex: "username",
        },
        {
            title: "email",
            dataIndex: "email",
        },
        {
            title: "firstname",
            dataIndex: "firstname",
        },
        {
            title: "delete",
            dataIndex: "delete",
            render: (del: any, original: any) => (
                <CloseCircleOutlined
                    onClick={() => {
                        confirm({
                            title: "Вы уверены?",
                            onOk: () => {
                                deleteUser(original.id);
                            },
                        });
                    }}
                />
            ),
        },
    ];

    return (
        <>
            <Form.Item labelAlign={"right"} style={{ float: "right" }}>
                <Button
                    onClick={() => {
                        addNewUser();
                    }}
                    type="primary"
                >
                    ADD NEW USER
                </Button>
            </Form.Item>
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={
                    memoizedData && memoizedData.length ? memoizedData : []
                }
            />
        </>
    );
});

function useAddNewUser(refetch: () => void) {
    const [mutation] = useMutation(props => axios.post("/api/users"), {
        onSuccess: () => {
            notification.success({ message: "Added" });
            refetch();
        },
    });
    return useCallback(() => {
        mutation();
    }, [mutation]);
}

function useDeleteUser(refetch: () => void) {
    const [userId, setUserId] = useState<string>();
    const [mutation] = useMutation(
        props => axios.post("/api/user", { userId }),
        {
            onSuccess: () => {
                notification.success({ message: "Deleted" });
                refetch();
            },
        },
    );
    return useCallback(
        (id: string) => {
            setUserId(id);
            mutation();
        },
        [mutation],
    );
}

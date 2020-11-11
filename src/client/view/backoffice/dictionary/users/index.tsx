import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { Query } from "../../../../service/types/types";
import { useUsersHelper } from "./helper";
import { ModalForm } from "../../../../components/modal-form";
import { ALL_USERS } from "./gql/all-users";
import _ from "lodash";
import { useUser } from "../../../../hooks/use-user";

const { confirm } = Modal;

export const DictionaryUsers = React.memo(() => {
    const styleUtils = useStyleUtils();

    const user = useUser();
    // eslint-disable-next-line no-console
    console.log(user);
    const allUsersQuery = useQuery<Query>(ALL_USERS);

    const allUsers = useMemo(() => allUsersQuery.data?.users.allUsers || [], [
        allUsersQuery.data?.users.allUsers,
    ]);

    const {
        loadingMutation,
        formFields,
        sendDeleteUser,
        sendUpdateUser,
        positions,
    } = useUsersHelper();

    const columns = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "firstname",
            },
            {
                title: "Логин",
                dataIndex: "username",
            },
            {
                title: "Должность",
                dataIndex: "position",
                render: (position: any) =>
                    positions.find(elem => elem.value === position)?.label,
            },
            {
                title: "",
                dataIndex: "edit",
                render: (edit: any, record: any) => (
                    <>
                        <ModalForm
                            onSubmit={values => {
                                sendUpdateUser(
                                    record.id,
                                    _.pick(
                                        values,
                                        "firstname",
                                        "username",
                                        "position",
                                        "password",
                                    ),
                                );
                                values.setVisible();
                            }}
                            formFields={formFields}
                            edit={record}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={styleUtils.cursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </ModalForm>
                        <DeleteOutlined
                            style={styleUtils.cursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.username}]`,
                                    onOk: () => {
                                        sendDeleteUser(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [
            formFields,
            positions,
            sendDeleteUser,
            sendUpdateUser,
            styleUtils.cursorPointer,
        ],
    );

    const loading = allUsersQuery.loading || loadingMutation;

    return <Table columns={columns} dataSource={allUsers} loading={loading} />;
});

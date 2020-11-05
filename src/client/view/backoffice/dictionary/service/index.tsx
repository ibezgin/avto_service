import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import _ from "lodash";
import React, { useMemo } from "react";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { DictionaryServiceModal } from "./modal";
import { Query } from "../../../../service/types/types";
import { ALL_SERVICES } from "./gql/all-services";
import { useServiceHelper } from "./helper";

const { confirm } = Modal;

export const DictionaryService = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allServiceQuery = useQuery<Query>(ALL_SERVICES);

    const allServices = useMemo(
        () => allServiceQuery.data?.service.allServices || [],
        [allServiceQuery.data?.service.allServices],
    );

    const { sendDeleteService, loadingMutation } = useServiceHelper();

    const columns = useMemo(
        () => [
            {
                title: "Услуга",
                dataIndex: "title",
            },
            {
                title: "Цена",
                dataIndex: "price",
            },
            {
                title: "",
                dataIndex: "edit",
                render: (edit: any, record: any) => (
                    <>
                        <DictionaryServiceModal
                            edit={_.pick(record, ["id", "title", "price"])}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={styleUtils.cursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </DictionaryServiceModal>
                        <DeleteOutlined
                            style={styleUtils.cursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteService(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [sendDeleteService, styleUtils.cursorPointer],
    );

    const loading = allServiceQuery.loading || loadingMutation;

    return (
        <Table columns={columns} dataSource={allServices} loading={loading} />
    );
});

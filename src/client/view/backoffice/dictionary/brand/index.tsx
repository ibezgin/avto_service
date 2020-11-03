/* eslint-disable @typescript-eslint/camelcase */
import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { Query } from "../../../../service/types/types";
import { All_BRAND } from "./gql/all-brands";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDictionaryBrandHelper } from "./helper";
import { DictionaryBrandModal } from "./modal";

const { confirm } = Modal;

export const DictionaryBrand = React.memo(() => {
    const brandsQuery = useQuery<Query>(All_BRAND);

    const { sendDeleteBrand } = useDictionaryBrandHelper();

    const brands = useMemo(() => brandsQuery.data?.brand.allBrands, [
        brandsQuery.data?.brand.allBrands,
    ]);

    const coursorPointer = useMemo(
        () => ({
            cursor: "pointer",
        }),
        [],
    );
    const columns = useMemo(
        () => [
            {
                title: "Название",
                dataIndex: "title",
            },
            {
                title: "",
                dataIndex: "edit",
                render: (edit: any, record: any) => (
                    <>
                        <DictionaryBrandModal
                            _id={record._id}
                            titleBrand={record.title}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={coursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </DictionaryBrandModal>
                        {"   "}
                        <DeleteOutlined
                            style={coursorPointer}
                            onClick={() => {
                                confirm({
                                    title: "Подтвердите удаление",
                                    onOk: () => {
                                        sendDeleteBrand(record._id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [coursorPointer, sendDeleteBrand],
    );

    return (
        <Table
            columns={columns}
            dataSource={brands}
            loading={brandsQuery.loading}
        />
    );
});

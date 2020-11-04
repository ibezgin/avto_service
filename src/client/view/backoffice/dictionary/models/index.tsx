import { Modal, Table } from "antd";
import React, { useMemo } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useStyleUtils } from "../../../../hooks/use-style-utils";
import { ALL_MODELS } from "./gql/all-models";
import { Query } from "../../../../service/types/types";
import { useQuery } from "@apollo/client";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../brand/gql/all-brands";
import { useModelsHelper } from "./helper";
import { DictionaryModelsModal } from "./modal";
import _ from "lodash";

const { confirm } = Modal;

export const DictionaryModels = React.memo(() => {
    const styleUtils = useStyleUtils();

    const allModelsQuery = useQuery<Query>(ALL_MODELS);

    const allBrandsQuery = useQuery<Query>(All_BRAND);

    const allModels = useMemo(
        () => allModelsQuery.data?.models.allModels || [],
        [allModelsQuery.data?.models.allModels],
    );

    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const { sendDeleteModel, mutationLoading } = useModelsHelper();

    const columns = useMemo(
        () => [
            {
                title: "Модель",
                dataIndex: "title",
            },
            {
                title: "Марка",
                dataIndex: "brandId",
                render: (brandId: string) =>
                    allBrand.find(elem => elem.id === brandId).title,
            },
            {
                title: "",
                dataIndex: "edit",
                render: (edit: any, record: any) => (
                    <>
                        <DictionaryModelsModal
                            edit={_.pick(record, ["id", "title", "brandId"])}
                        >
                            {setVisible => (
                                <EditOutlined
                                    style={styleUtils.cursorPointer}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </DictionaryModelsModal>
                        <DeleteOutlined
                            style={styleUtils.cursorPointer}
                            onClick={() => {
                                confirm({
                                    title: `Подтвердите удаление [${record.title}]`,
                                    onOk: () => {
                                        sendDeleteModel(record.id);
                                    },
                                });
                            }}
                        />
                    </>
                ),
            },
        ],
        [allBrand, sendDeleteModel, styleUtils.cursorPointer],
    );

    const loading =
        mutationLoading || allBrandsQuery.loading || allModelsQuery.loading;

    return (
        <>
            <Table columns={columns} dataSource={allModels} loading={loading} />
        </>
    );
});

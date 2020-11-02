/* eslint-disable @typescript-eslint/camelcase */
import { useQuery } from "@apollo/client";
import { Table } from "antd";
import React, { useMemo } from "react";
import { Query } from "../../../../service/types/types";
import { All_BRAND } from "./gql/all-brands";

export const DictionaryBrand = React.memo(() => {
    const brandsQuery = useQuery<Query>(All_BRAND);
    const brands = useMemo(() => brandsQuery.data?.brand.allBrands, [
        brandsQuery.data?.brand.allBrands,
    ]);
    const columns = useMemo(
        () => [
            {
                title: "Title",
                dataIndex: "title",
            },
        ],
        [],
    );

    return (
        <Table
            columns={columns}
            dataSource={brands}
            loading={brandsQuery.loading}
        />
    );
});

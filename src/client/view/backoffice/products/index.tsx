import { Table, Button, Form, Upload } from "antd";

import { useProductHelper } from "./helper";
import { useState } from "react";
import { Modal } from "antd";
import { Formik } from "formik";
import {
    Form as ForikAntdForm,
    Input,
    Switch,
    SubmitButton,
} from "formik-antd";
import { Switch as CustomSwitch } from "antd";
import {
    LoadingOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useQuery, gql } from "@apollo/client";
import { Query, ProductType } from "../../../service/types/types";
import { useMemo } from "react";
import { EditOutlined } from "@ant-design/icons";
import _ from "lodash";

const { confirm } = Modal;

const ALL_PRODUCTS = gql`
    query AllProducts {
        products {
            allProducts {
                _id
                title
                price
                imagePath
                count
                isDisplayed
            }
        }
    }
`;

export const Products = React.memo(() => {
    const [visible, setVisible] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [loading] = useState<boolean>(false);

    const [editableObject, setEditableObject] = useState<ProductType>();

    const allProductsQuery = useQuery<Query>(ALL_PRODUCTS, {
        ssr: false,
    });

    const memoizedAllProducts = useMemo(
        () => allProductsQuery?.data?.products?.allProducts || [],
        [allProductsQuery?.data?.products?.allProducts],
    );

    const { addProduct, updateProduct, deleteProduct } = useProductHelper(
        allProductsQuery.refetch,
        setVisible,
    );
    const columns = [
        {
            title: "id",
            dataIndex: "_id",
        },
        {
            title: "title",
            dataIndex: "title",
        },
        {
            title: "price",
            dataIndex: "price",
        },
        {
            title: "image",
            dataIndex: "imagePath",
        },
        {
            title: "count",
            dataIndex: "count",
        },
        {
            title: "isDisplayed",
            dataIndex: "isDisplayed",
            render: (isDisplayed: boolean, original: ProductType) => (
                <CustomSwitch
                    checked={isDisplayed}
                    onChange={value => {
                        updateProduct({
                            ..._.omit(original, ["__typename"]),
                            ...{
                                isDisplayed: value,
                                price: Number(original.price),
                            },
                        });
                    }}
                />
            ),
        },
        {
            title: "edit",
            dataIndex: "edit",
            render: (ed: any, original: ProductType) => (
                <EditOutlined
                    onClick={() => {
                        setEdit(true);
                        setEditableObject(original);
                        setVisible(true);
                    }}
                />
            ),
        },
        {
            title: "remove",
            dataIndex: "remove",
            render: (rm: any, original: ProductType) => (
                <DeleteOutlined
                    onClick={() => {
                        confirm({
                            title: "Вы уверены?",
                            onOk: () => {
                                deleteProduct(original._id);
                            },
                        });
                    }}
                />
            ),
        },
    ];

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Modal
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                title={edit ? "Редактировать" : "Добавить"}
                footer={null}
            >
                <Formik
                    initialValues={{
                        title: edit ? editableObject.title : "",
                        price: edit ? Number(editableObject.price) : null,
                        imagePath: edit ? editableObject.imagePath : "",
                        count: edit ? editableObject.count : null,
                        isDisplayed: edit ? editableObject.isDisplayed : false,
                    }}
                    onSubmit={value => {
                        if (edit) {
                            updateProduct({
                                ...value,
                                ...{ _id: editableObject._id },
                            });
                        } else {
                            addProduct(value);
                        }
                    }}
                    enableReinitialize={true}
                >
                    {({ values }) => {
                        return (
                            <ForikAntdForm layout="vertical">
                                <Form.Item label="title">
                                    <Input name="title" required />
                                </Form.Item>
                                <Form.Item label="price">
                                    <Input
                                        name="price"
                                        type="number"
                                        required
                                    />
                                </Form.Item>
                                <Form.Item label="image">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={() => {
                                            // asdasd
                                        }}
                                    >
                                        {values.imagePath ? (
                                            <img
                                                src={values.imagePath}
                                                alt="avatar"
                                                style={{ width: "100%" }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="count">
                                    <Input name="count" type="number" />
                                </Form.Item>
                                <Form.Item label="displayed">
                                    <Switch name="isDisplayed" />
                                </Form.Item>
                                <SubmitButton type="primary" loading={false}>
                                    Сохранить
                                </SubmitButton>
                            </ForikAntdForm>
                        );
                    }}
                </Formik>
            </Modal>
            <Form.Item labelAlign={"right"} style={{ float: "right" }}>
                <Button
                    onClick={() => {
                        setVisible(true);
                        setEdit(false);
                    }}
                    type="primary"
                >
                    ADD PRODUCT
                </Button>
            </Form.Item>
            <Table
                columns={columns}
                dataSource={memoizedAllProducts || []}
                loading={allProductsQuery.loading}
            />
        </>
    );
});

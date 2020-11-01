import { Table, Form, Button, notification, Input } from "antd";
import { useMutation, gql, useQuery } from "@apollo/client";
import { useCallback, useState, useEffect } from "react";
import Modal from "antd/lib/modal/Modal";
import { UniversalEditor } from "../../../components/univiesal-editor";
import { useMemo } from "react";
import { editorHtmlCleaner } from "../../../service/utils/editor-html-cleaner";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    Query,
    NewsType,
    NewsMutationUpdateNewsArgs,
    NewsInput,
    NewsMutationDeleteNewsArgs,
} from "../../../service/types/types";
import confirm from "antd/lib/modal/confirm";

const ADD_NEWS = gql`
    mutation AddNews($title: String, $content: String) {
        news {
            addNews(title: $title, content: $content)
        }
    }
`;

const UPDATE_NEWS = gql`
    mutation UpdateNews($value: NewsInput) {
        news {
            updateNews(value: $value)
        }
    }
`;

const DELETE_NEWS = gql`
    mutation DeleteeNews($id: String) {
        news {
            deleteNews(id: $id)
        }
    }
`;

const GET_NEWS = gql`
    query allNews {
        news {
            allNews {
                _id
                title
                content
            }
        }
    }
`;

export const News = React.memo(() => {
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [edit, setEdit] = useState<boolean>(false);
    const [editableObject, setEditableObject] = useState<NewsType>();
    const allNewsQuery = useQuery<Query>(GET_NEWS, {
        ssr: false,
    });

    const memoizedAllNews = useMemo(
        () => allNewsQuery?.data?.news?.allNews || [],
        [allNewsQuery?.data?.news?.allNews],
    );

    const addNewsMutation = useAddNewsMutation(
        allNewsQuery.refetch,
        setVisible,
    );

    const updateNewsMutation = useUpdateNewsMutation(
        allNewsQuery.refetch,
        setVisible,
    );
    const deleteNewsMutation = useDeleteNewsMutation(allNewsQuery.refetch);
    useEffect(() => {
        if (edit) {
            setTitle(editableObject?.title || "");
        }
    }, [edit, editableObject?.title]);

    const columns = [
        {
            title: "id",
            dataIndex: "_id",
        },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Content",
            dataIndex: "content",
        },

        {
            title: "edit",
            dataIndex: "edit",
            render: (ed: any, original: NewsType) => (
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
            render: (ed: any, original: NewsType) => (
                <DeleteOutlined
                    onClick={() => {
                        confirm({
                            title: "Вы уверены?",
                            onOk: () => {
                                deleteNewsMutation(original._id);
                            },
                        });
                    }}
                />
            ),
        },
    ];
    return (
        <>
            <Modal
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                }}
                width={"1wh"}
                style={{ margin: "60px" }}
                title={edit ? "Редактировать" : "Добавить"}
                onOk={() => {
                    if (edit) {
                        updateNewsMutation({
                            _id: editableObject._id,
                            title,
                            content: editorHtmlCleaner(content),
                        });
                    } else {
                        addNewsMutation(title, editorHtmlCleaner(content));
                    }
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="Title:">
                        <Input
                            placeholder="title"
                            value={title}
                            onChange={event => {
                                setTitle(event.target.value);
                            }}
                        />
                    </Form.Item>
                    <UniversalEditor
                        getContent={setContent}
                        initialContent={
                            edit ? editableObject.content : undefined
                        }
                    />
                </Form>
            </Modal>
            <Form.Item labelAlign={"right"} style={{ float: "right" }}>
                <Button
                    onClick={() => {
                        setVisible(true);
                        setEdit(false);
                    }}
                    type="primary"
                >
                    ADD NEWS
                </Button>
            </Form.Item>
            <Table columns={columns} dataSource={memoizedAllNews || []} />
        </>
    );
});

function useAddNewsMutation(
    refetch: () => void,
    setVisible: (value: boolean) => void,
) {
    const [mutation] = useMutation(ADD_NEWS, {
        onCompleted: () => {
            notification.success({ message: "Новость добавлена" });
            refetch();
            setVisible(false);
        },
        onError: () => {
            notification.error({ message: "Произошла ошибка" });
        },
    });

    return useCallback(
        (title: string, content: string) => {
            mutation({
                variables: {
                    title,
                    content,
                },
            });
        },
        [mutation],
    );
}

function useUpdateNewsMutation(
    refetch: () => void,
    setVisible: (value: boolean) => void,
) {
    const [mutation] = useMutation<any, NewsMutationUpdateNewsArgs>(
        UPDATE_NEWS,
        {
            onCompleted: () => {
                notification.success({ message: "Новость обновлена" });
                refetch();
                setVisible(false);
            },
            onError: () => {
                notification.error({ message: "Произошла ошибка" });
            },
        },
    );

    return useCallback(
        (value: NewsInput) => {
            mutation({
                variables: {
                    value,
                },
            });
        },
        [mutation],
    );
}

function useDeleteNewsMutation(refetch: () => void) {
    const [mutation] = useMutation<any, NewsMutationDeleteNewsArgs>(
        DELETE_NEWS,
        {
            onCompleted: () => {
                notification.success({ message: "Новость удалена" });
                refetch();
            },
            onError: () => {
                notification.error({ message: "Произошла ошибка" });
            },
        },
    );

    return useCallback(
        (id: string) => {
            mutation({
                variables: {
                    id,
                },
            });
        },
        [mutation],
    );
}

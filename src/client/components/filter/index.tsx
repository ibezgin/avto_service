import React, { useCallback, useEffect, useMemo, useState } from "react";
import { filterItems } from "./items";
import { DocumentNode } from "graphql";
import { Formik } from "formik";
import * as FormikAntd from "formik-antd";
import { Button, Form } from "antd";
import { useHasWindow } from "../../hooks/use-has-window";
import _ from "lodash";
import { OperationVariables, QueryFunctionOptions } from "@apollo/client";
import { SC } from "./styled";
import { useChangeFormik } from "../../hooks/use-change-formik";
import { TablePaginationConfig } from "antd/lib/table";
import { Query, QueryResult } from "@apollo/react-components";

export interface ITypeFilterItems {
    // periods?: Array<moment.Moment | string>;
    // userId: string;
    // clientId: string;
    // carId: string;
    // brandId: string;
    // modelId: string;
    assignedToMe?: boolean;
}

interface IQueryComponentOptions<TData, TVariables = OperationVariables>
    extends QueryFunctionOptions<TData, TVariables> {
    children: (
        result: QueryResult<TData, TVariables>,
        optional: {
            pagination?: false | TablePaginationConfig;
            setSorter?: (
                order: string | undefined,
                field: string | undefined,
            ) => void;
        },
    ) => JSX.Element | null;
    query: DocumentNode;
}

interface IProps<P> extends IQueryComponentOptions<P> {
    filterItems: Array<keyof ITypeFilterItems>;
    variables?: {
        [key: string]: any;
    };
    skip?: boolean;
    ssr?: boolean;
    paginationItemRender?: any;
}
const items = [
    {
        name: "assignedToMe",
        component: filterItems.FilterAssignedToMe,
    },
];
function useInitialValues(): ITypeFilterItems {
    return {
        assignedToMe: false,
    };
}

const getInitialValues = (
    currentFilterItems: Array<keyof ITypeFilterItems>,
    initialValues: ITypeFilterItems,
) => {
    const obj: { [key in keyof ITypeFilterItems]: ITypeFilterItems[key] } = {};
    currentFilterItems.forEach(elem => {
        (obj as any)[elem] = initialValues[elem];
    });
    return obj;
};

const pageSize = 30;

export function Filter<T>(props: IProps<T>) {
    const initialValues = useInitialValues();
    const [skip, setSkip] = useState(
        typeof props.skip === "boolean" ? props.skip : true,
    );
    const currentInitialValues = getInitialValues(
        [...props.filterItems],
        initialValues,
    );
    const [isRefetch, setRefetchState] = useState(false);
    const [variables, setVariables] = useState({
        ...currentInitialValues,
        ...(props.variables || {}),
    });

    // const [sorter, setSorter] = useState<{
    //     order?: string;
    //     field?: string;
    // }>({
    //     order: undefined,
    //     field: undefined,
    // });

    useEffect(() => {
        setVariables({
            ...variables,
            ...props.variables,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.variables]);

    useEffect(() => {
        setSkip(Boolean(props.skip));
    }, [props.skip]);

    useEffect(() => {
        setVariables({
            ...currentInitialValues,
            ...(props.variables || {}),
        });
        if (props.skip) {
            setSkip(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const queryVariables = useMemo(
        () => ({
            ...variables,
        }),
        [variables],
    );

    const getValues = useCallback(
        (values: ITypeFilterItems, availableFields: any) => {
            const obj: any = {};
            Object.keys(values).forEach(key => {
                if (key in availableFields) {
                    obj[key] = (values as any)[key];
                }
            });
            return obj;
        },
        [],
    );

    const changeForm = useCallback(() => {
        setRefetchState(false);
    }, []);
    const buttonHandler = useCallback(
        (loading: boolean) => () => {
            if (loading) {
                setSkip(true);
            }
        },
        [],
    );

    const hasWindow = useHasWindow();

    // const data = useQuery<T>(props.query, {
    //     skip,
    //     notifyOnNetworkStatusChange: true,
    //     variables: queryVariables,
    // });

    return (
        <SC.Wrapper>
            <Query<T>
                query={props.query}
                variables={queryVariables}
                skip={skip}
                notifyOnNetworkStatusChange={true}
            >
                {data => {
                    const loading = Boolean(
                        hasWindow && (data.loading || data.networkStatus === 4),
                    );

                    return (
                        <Formik
                            initialValues={initialValues}
                            onSubmit={values => {
                                if (isRefetch) {
                                    data.refetch();
                                } else {
                                    setVariables({
                                        ...variables,
                                        ...getValues(
                                            values,
                                            currentInitialValues,
                                        ),
                                    });
                                    setRefetchState(true);
                                }
                                setSkip(false);
                            }}
                        >
                            {({ values }) => {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                useChangeFormik(values, changeForm);
                                return (
                                    <>
                                        <FormikAntd.Form layout="inline">
                                            {props.filterItems.map(name => {
                                                const found = _.find(items, {
                                                    name,
                                                });
                                                return found ? (
                                                    <Form.Item>
                                                        <found.component />
                                                    </Form.Item>
                                                ) : null;
                                            })}
                                            <Form.Item>
                                                <div
                                                    onClick={buttonHandler(
                                                        loading,
                                                    )}
                                                >
                                                    <Button
                                                        htmlType="submit"
                                                        type="primary"
                                                        loading={loading}
                                                    >
                                                        {loading && "Отменить"}
                                                        {!loading &&
                                                            "Применить"}
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </FormikAntd.Form>
                                        {props.children(data, {
                                            pagination: {
                                                pageSize,
                                                defaultPageSize: pageSize,
                                                position: ["topRight"],
                                                simple: true,
                                                size: "small",
                                                itemRender:
                                                    props.paginationItemRender,
                                            },
                                        })}
                                    </>
                                );
                            }}
                        </Formik>
                    );
                }}
            </Query>
        </SC.Wrapper>
    );
}
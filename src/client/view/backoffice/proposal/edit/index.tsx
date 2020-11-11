import { useQuery } from "@apollo/client";
import { List, Tag } from "antd";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    CardCell,
    CardInner,
    CardRow,
    CardSave,
    CardTitle,
    CardWrapper,
} from "../../../../components/ui/card/styled";
import { Query } from "../../../../service/types/types";
import { ALL_CLIENTS } from "../clients/gql/all-clients";
import * as FormikAntd from "formik-antd";
import { ALL_CARS } from "../cars/gql/all-cars";
import { ALL_MODELS } from "../../dictionary/models/gql/all-models";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../../dictionary/brand/gql/all-brands";
import { ProposalStatus } from "../../../../service/enums/proposal-status";
import { ALL_SERVICES } from "../../dictionary/service/gql/all-services";
import { ALL_USERS } from "../../dictionary/users/gql/all-users";
import { Specialization } from "../../../../service/enums/specialization";

export const ProposalEdit = React.memo(() => {
    const [client, setClient] = useState("");

    const [car, setCar] = useState("");

    const [user, setUser] = useState("");

    const [service, setService] = useState([]);

    const [completedWork, setCompletedWork] = useState<any>({});

    const allClientsQuery = useQuery<Query>(ALL_CLIENTS);

    const allCarsQuery = useQuery<Query>(ALL_CARS);

    const allModelsQuery = useQuery<Query>(ALL_MODELS);

    const allBrandsQuery = useQuery<Query>(All_BRAND);

    const allServiceQuery = useQuery<Query>(ALL_SERVICES);

    const allUsersQuery = useQuery<Query>(ALL_USERS);

    const allClients = useMemo(() => allClientsQuery.data?.clients.allClients, [
        allClientsQuery.data?.clients.allClients,
    ]);

    const allCars = useMemo(
        () =>
            allCarsQuery.data?.cars.allCars?.filter(
                elem => elem.clientId === client,
            ),
        [allCarsQuery.data?.cars.allCars, client],
    );

    const clientInfo = useMemo(
        () => allClients?.find(elem => elem.id === client),
        [allClients, client],
    );

    const allModels = useMemo(() => allModelsQuery.data?.models.allModels, [
        allModelsQuery.data?.models.allModels,
    ]);
    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const carInfo = useMemo(() => allCars?.find(elem => elem.id === car), [
        allCars,
        car,
    ]);

    const allServices = useMemo(
        () => allServiceQuery.data?.service.allServices,
        [allServiceQuery.data?.service.allServices],
    );

    const recomendedWorkDatasourse = useMemo(
        () =>
            service.map(elem => ({
                id: elem,
                title: allServices.find(serv => serv.id === elem).title,
            })),
        [allServices, service],
    );

    const technicalUsers = useMemo(
        () =>
            allUsersQuery.data?.users.allUsers.filter(
                elem => elem.position === Specialization.TECHNICAL,
            ),
        [allUsersQuery.data?.users.allUsers],
    );

    const specialistInfo = useMemo(
        () => technicalUsers?.find(elem => elem.id === user),
        [technicalUsers, user],
    );
    const priceChecker = useCallback(() => {
        let price = 0;

        const complitedKeys = [];
        for (const serviceId in completedWork) {
            if (completedWork[serviceId]) {
                complitedKeys.push(serviceId);
            }
        }

        for (const key of complitedKeys) {
            price += allServices?.find(elem => elem.id === key)?.price;
        }

        return price;
    }, [allServices, completedWork]);

    const proposalStatuses = [
        {
            value: ProposalStatus.ACCEPTED,
            label: "Принята",
        },
        {
            value: ProposalStatus.TECHNICAL_INSPECTION,
            label: "Технический осмотр",
        },
        {
            value: ProposalStatus.TECHNICAL_WORKS,
            label: "Технические работы",
        },
        {
            value: ProposalStatus.COMPLETED,
            label: "Завершена",
        },
        {
            value: ProposalStatus.PAY_AND_COMPLITED,
            label: "Оплачена и завершена",
        },
    ];

    return (
        <Formik
            initialValues={{
                clientId: "",
                carId: "",
                // status: ProposalStatus.ACCEPTED,
                status: ProposalStatus.ACCEPTED,
                userId: "",
                proposalReason: "",
                technicalInspectionResult: "",
                recomendedWork: [],
                completedWork: {},
            }}
            onSubmit={values => {
                // eslint-disable-next-line no-console
                console.log(values);
            }}
            enableReinitialize={true}
        >
            {({ values, setFieldValue }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    setClient(values.clientId);
                }, [values.clientId]);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    setCar(values.carId);
                }, [values.carId]);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    setService(values.recomendedWork);
                }, [values.recomendedWork]);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    setCompletedWork(values.completedWork);
                }, [values.completedWork, values.recomendedWork]);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    setUser(values.userId);
                }, [values.userId]);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    for (const key in values.completedWork) {
                        if (values.recomendedWork.indexOf(key) === -1) {
                            setFieldValue(`completedWork[${key}]`, undefined);
                        }
                    }
                }, [
                    setFieldValue,
                    values.completedWork,
                    values.recomendedWork,
                ]);
                return (
                    <FormikAntd.Form>
                        <CardWrapper>
                            <CardInner>
                                <CardRow>
                                    <CardCell>
                                        <CardTitle>
                                            Информация о клиенте
                                        </CardTitle>
                                    </CardCell>
                                </CardRow>
                                <CardRow>
                                    <CardCell>
                                        <FormikAntd.Select
                                            name="clientId"
                                            placeholder="Выберите клиента"
                                            dropdownMatchSelectWidth={false}
                                            allowClear={false}
                                        >
                                            {(allClients || []).map(elem => (
                                                <FormikAntd.Select.Option
                                                    key={`modal-form-option-${String(
                                                        elem?.id,
                                                    )}`}
                                                    value={String(elem?.id)}
                                                >
                                                    {elem?.firstName}{" "}
                                                    {elem.lastName} {elem.phone}
                                                </FormikAntd.Select.Option>
                                            ))}
                                        </FormikAntd.Select>
                                    </CardCell>
                                </CardRow>
                                {values.clientId && (
                                    <>
                                        <CardRow>
                                            <CardCell>Имя</CardCell>
                                            <CardCell>
                                                {clientInfo?.firstName}
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>Фамилия</CardCell>
                                            <CardCell>
                                                {clientInfo?.lastName}
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>Номер телефона</CardCell>
                                            <CardCell>
                                                {clientInfo?.phone}
                                            </CardCell>
                                        </CardRow>
                                    </>
                                )}
                                <CardRow>
                                    <CardCell>
                                        <CardTitle>Информация о авто</CardTitle>
                                    </CardCell>
                                </CardRow>
                                <CardRow>
                                    <CardCell>
                                        <FormikAntd.Select
                                            name="carId"
                                            placeholder="Выберите авто"
                                            dropdownMatchSelectWidth={false}
                                            allowClear={false}
                                            disabled={!values.clientId}
                                        >
                                            {(allCars || []).map(elem => (
                                                <FormikAntd.Select.Option
                                                    key={`modal-form-option-${String(
                                                        elem?.id,
                                                    )}`}
                                                    value={String(elem?.id)}
                                                >
                                                    {
                                                        allBrand?.find(
                                                            brand =>
                                                                brand.id ===
                                                                elem?.brandId,
                                                        ).title
                                                    }{" "}
                                                    {
                                                        allModels?.find(
                                                            model =>
                                                                model.id ===
                                                                elem?.modelId,
                                                        ).title
                                                    }{" "}
                                                    {elem?.gosNumber}{" "}
                                                </FormikAntd.Select.Option>
                                            ))}
                                        </FormikAntd.Select>
                                    </CardCell>
                                </CardRow>
                                {values.carId && (
                                    <>
                                        <CardRow>
                                            <CardCell>Марка</CardCell>
                                            <CardCell>
                                                {
                                                    allBrand?.find(
                                                        elem =>
                                                            elem?.id ===
                                                            carInfo?.brandId,
                                                    )?.title
                                                }
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>Модель</CardCell>
                                            <CardCell>
                                                {
                                                    allModels?.find(
                                                        elem =>
                                                            elem?.id ===
                                                            carInfo?.modelId,
                                                    )?.title
                                                }
                                            </CardCell>
                                        </CardRow>

                                        <CardRow>
                                            <CardCell>Гос номер</CardCell>
                                            <CardCell>
                                                {carInfo?.gosNumber}{" "}
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>Цвет</CardCell>
                                            <CardCell>
                                                {carInfo?.color}
                                            </CardCell>
                                        </CardRow>
                                    </>
                                )}
                                <CardRow>
                                    <CardCell>
                                        <CardTitle>Статус заявки</CardTitle>
                                    </CardCell>
                                    <CardCell>
                                        <Tag
                                            color={
                                                values.status ===
                                                ProposalStatus.ACCEPTED
                                                    ? "volcano"
                                                    : values.status ===
                                                      ProposalStatus.TECHNICAL_INSPECTION
                                                    ? "purple"
                                                    : values.status ===
                                                      ProposalStatus.TECHNICAL_WORKS
                                                    ? "blue"
                                                    : values.status ===
                                                      ProposalStatus.COMPLETED
                                                    ? "magenta"
                                                    : "green"
                                            }
                                        >
                                            {
                                                proposalStatuses.find(
                                                    elem =>
                                                        elem.value ===
                                                        values.status,
                                                )?.label
                                            }
                                        </Tag>
                                    </CardCell>
                                </CardRow>{" "}
                                <CardRow>
                                    <CardCell>Изменить статус</CardCell>
                                    <CardCell>
                                        <FormikAntd.Select
                                            name="status"
                                            placeholder="Статус заявкии"
                                            dropdownMatchSelectWidth={false}
                                            allowClear={false}
                                        >
                                            {(proposalStatuses || []).map(
                                                elem => (
                                                    <FormikAntd.Select.Option
                                                        key={`status-form-option-${String(
                                                            elem?.value,
                                                        )}`}
                                                        value={elem?.value}
                                                    >
                                                        {elem?.label}{" "}
                                                    </FormikAntd.Select.Option>
                                                ),
                                            )}
                                        </FormikAntd.Select>
                                    </CardCell>{" "}
                                </CardRow>{" "}
                                <CardRow>
                                    <CardCell>
                                        <CardTitle>Специалист</CardTitle>
                                    </CardCell>
                                    <CardCell>
                                        {specialistInfo?.firstname}{" "}
                                        {specialistInfo?.lastname}
                                    </CardCell>
                                </CardRow>
                                <CardRow>
                                    <CardCell>Изменить специалиста</CardCell>
                                    <CardCell>
                                        <FormikAntd.Select
                                            name="userId"
                                            placeholder="Специалист"
                                            dropdownMatchSelectWidth={false}
                                            allowClear={false}
                                        >
                                            {(technicalUsers || []).map(
                                                elem => (
                                                    <FormikAntd.Select.Option
                                                        key={`specialist-form-option-${String(
                                                            elem?.id,
                                                        )}`}
                                                        value={String(elem?.id)}
                                                    >
                                                        {elem?.firstname}{" "}
                                                        {elem?.lastname}
                                                    </FormikAntd.Select.Option>
                                                ),
                                            )}
                                        </FormikAntd.Select>
                                    </CardCell>
                                </CardRow>
                                <CardRow>
                                    <CardCell>
                                        <CardTitle>Причина обращения</CardTitle>
                                    </CardCell>
                                </CardRow>
                                <CardRow>
                                    <FormikAntd.Input.TextArea
                                        name="proposalReason"
                                        rows={4}
                                    />
                                </CardRow>
                                <CardRow>
                                    <CardCell>{values.proposalReason}</CardCell>
                                </CardRow>
                                {values.status !== ProposalStatus.ACCEPTED && (
                                    <>
                                        {" "}
                                        <CardRow>
                                            <CardCell>
                                                <CardTitle>
                                                    Результат технического
                                                    осмотра
                                                </CardTitle>
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <FormikAntd.Input.TextArea
                                                name="technicalInspectionResult"
                                                rows={4}
                                            />
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>
                                                {
                                                    values.technicalInspectionResult
                                                }
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>
                                                <CardTitle>
                                                    Рекомендованные работы
                                                </CardTitle>
                                            </CardCell>
                                        </CardRow>
                                        <CardRow>
                                            <CardCell>
                                                <FormikAntd.Select
                                                    name="recomendedWork"
                                                    placeholder="Рекомендованные работы"
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    allowClear={false}
                                                    mode="multiple"
                                                >
                                                    {(allServices || []).map(
                                                        elem => (
                                                            <FormikAntd.Select.Option
                                                                key={`modal-form-option-${String(
                                                                    elem?.id,
                                                                )}`}
                                                                value={String(
                                                                    elem?.id,
                                                                )}
                                                            >
                                                                {elem?.title}{" "}
                                                            </FormikAntd.Select.Option>
                                                        ),
                                                    )}
                                                </FormikAntd.Select>
                                            </CardCell>
                                        </CardRow>
                                        <List
                                            size="large"
                                            dataSource={
                                                recomendedWorkDatasourse
                                            }
                                            renderItem={item => (
                                                <List.Item>
                                                    {item.title}
                                                </List.Item>
                                            )}
                                        />
                                        <CardRow>
                                            <CardCell>
                                                <CardTitle>
                                                    Выполненные работы
                                                </CardTitle>
                                            </CardCell>
                                        </CardRow>
                                        <List
                                            size="large"
                                            dataSource={
                                                recomendedWorkDatasourse
                                            }
                                            renderItem={item => (
                                                <List.Item>
                                                    <FormikAntd.Checkbox
                                                        name={`completedWork[${item.id}]`}
                                                        disabled={false}
                                                    >
                                                        {item.title}
                                                    </FormikAntd.Checkbox>
                                                </List.Item>
                                            )}
                                        />
                                        <CardRow>
                                            <CardCell>
                                                <CardTitle>
                                                    Итого: {priceChecker()} руб.
                                                </CardTitle>
                                            </CardCell>
                                        </CardRow>
                                    </>
                                )}
                            </CardInner>
                            <CardSave>
                                <FormikAntd.SubmitButton loading={false}>
                                    Сохранить
                                </FormikAntd.SubmitButton>
                            </CardSave>
                        </CardWrapper>
                    </FormikAntd.Form>
                );
            }}
        </Formik>
    );
});

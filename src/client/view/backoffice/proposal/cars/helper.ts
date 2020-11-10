import { useMutation, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { IFormField } from "../../../../components/modal-form";
import {
    CarInput,
    CarsMutationAddCarArgs,
    CarsMutationDeleteCarArgs,
    CarsMutationUpdateCarArgs,
    Mutation,
    Query,
} from "../../../../service/types/types";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../../dictionary/brand/gql/all-brands";
import { ALL_MODELS } from "../../dictionary/models/gql/all-models";
import { ALL_CLIENTS } from "../clients/gql/all-clients";
import { ADD_CAR } from "./gql/add-car";
import { DELETE_CAR } from "./gql/delete-car";
import { UPDATE_CAR } from "./gql/update-car";

const refetchQueries = ["AllCars"];

export function useCarsHelper() {
    const [brandState, setBrandState] = useState();

    const allClientsQuery = useQuery<Query>(ALL_CLIENTS);

    const allBrandQuery = useQuery<Query>(All_BRAND);

    const allModelsQuery = useQuery<Query>(ALL_MODELS);

    const allClients = useMemo(
        () => allClientsQuery.data?.clients.allClients || [],
        [allClientsQuery.data?.clients.allClients],
    );

    const allBrand = useMemo(() => allBrandQuery.data?.brand.allBrands || [], [
        allBrandQuery.data?.brand.allBrands,
    ]);

    const allModels = useMemo(
        () => allModelsQuery.data?.models.allModels || [],
        [allModelsQuery.data?.models.allModels],
    );

    const formFields = [
        {
            title: "Клиент",
            name: "clientId",
            type: "selectField",
            options: allClients.map(elem => ({
                label: `${elem.firstName}  ${elem.lastName}`,
                value: elem.id,
            })),
        },
        {
            title: "Марка авто",
            name: "brandId",
            type: "selectField",
            options: allBrand.map(elem => ({
                label: elem.title,
                value: elem.id,
            })),
        },
        {
            title: "Модель авто",
            name: "modelId",
            type: "selectField",
            options: allModels
                .filter(elem => elem.brandId === brandState)
                .map(elem => ({
                    label: elem.title,
                    value: elem.id,
                })),
        },
        {
            title: "Гос номер авто",
            name: "gosNumber",
            type: "gosNumberField",
        },
        {
            title: "Цвет",
            name: "color",
            type: "textField",
        },
    ] as IFormField[];

    const [addCar, addCarHelper] = useMutation<
        Mutation,
        CarsMutationAddCarArgs
    >(ADD_CAR);

    const [deleteCar, deleteCarHelper] = useMutation<
        Mutation,
        CarsMutationDeleteCarArgs
    >(DELETE_CAR);

    const [updateCar, updateCarHelper] = useMutation<
        Mutation,
        CarsMutationUpdateCarArgs
    >(UPDATE_CAR);

    const sendAddCar = (data: CarInput) => {
        addCar({
            variables: {
                data,
            },
            refetchQueries,
        });
    };
    const sendDeleteCar = (id: string) => {
        deleteCar({
            variables: {
                id,
            },
            refetchQueries,
        });
    };
    const sendUpdateCar = (id: string, data: CarInput) => {
        updateCar({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    return {
        mutationLoading: addCarHelper.loading || deleteCarHelper.loading,
        formFields,
        sendAddCar,
        sendDeleteCar,
        sendUpdateCar,
        setBrandState,
    };
}

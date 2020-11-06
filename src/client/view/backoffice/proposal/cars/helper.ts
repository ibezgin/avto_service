import { useMutation, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { IFormField } from "../../../../components/modal-form";
import {
    CarInput,
    CarsMutationAddCarArgs,
    Mutation,
    Query,
} from "../../../../service/types/types";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../../dictionary/brand/gql/all-brands";
import { ALL_MODELS } from "../../dictionary/models/gql/all-models";
import { ALL_CLIENTS } from "../clients/gql/all-clients";
import { ADD_CAR } from "./gql/add-car";

export function useCarsHelper() {
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
            options: allModels.map(elem => ({
                label: elem.title,
                value: elem.id,
            })),
        },
        {
            title: "Гос номер авто",
            name: "gosNumber",
            type: "gosNumberField",
        },
    ] as IFormField[];

    const [addCar, addCarHelper] = useMutation<
        Mutation,
        CarsMutationAddCarArgs
    >(ADD_CAR);

    const sendAddCar = (data: CarInput) => {
        addCar({
            variables: {
                data,
            },
        });
    };

    return {
        mutationLoading: addCarHelper.loading,
        formFields,
        sendAddCar,
    };
}

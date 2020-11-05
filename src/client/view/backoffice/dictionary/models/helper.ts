import { useMutation, useQuery } from "@apollo/client";
import { notification } from "antd";
import {
    ModelsMutationAddModelArgs,
    ModelsMutationDeleteModelArgs,
    Mutation,
    Query,
} from "../../../../service/types/types";
import { ADD_MODEL } from "./gql/add-model";
import { DELETE_MODEL } from "./gql/delete-model";
import { UPDATE_MODEL } from "./gql/update-model";
// eslint-disable-next-line @typescript-eslint/camelcase
import { All_BRAND } from "../brand/gql/all-brands";
import { useMemo } from "react";
import { IFormField } from "../../../../components/modal-form";

export function useModelsHelper() {
    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };

    const allBrandsQuery = useQuery<Query>(All_BRAND);

    const allBrand = useMemo(() => allBrandsQuery.data?.brand.allBrands, [
        allBrandsQuery.data?.brand.allBrands,
    ]);

    const refetchQueries = ["AllModels"];

    const [addModel, addModelHelper] = useMutation<
        Mutation,
        ModelsMutationAddModelArgs
    >(ADD_MODEL, options);

    const [deletesModel, deleteModelHelper] = useMutation<
        Mutation,
        ModelsMutationDeleteModelArgs
    >(DELETE_MODEL, options);

    const [updateModel, updateModelHelper] = useMutation<
        Mutation,
        ModelsMutationDeleteModelArgs
    >(UPDATE_MODEL, options);

    const sendAddModel = (title: string, brandId: string) => {
        addModel({
            variables: {
                title,
                brandId,
            },
            refetchQueries,
        });
    };

    const sendDeleteModel = (id: string) => {
        deletesModel({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    const sendUpdateModel = (variables: {
        id: string;
        title: string;
        brandId: string;
    }) => {
        updateModel({
            variables,
            refetchQueries,
        });
    };

    const validateForm = (values: any) => {
        if (!values.brandId) {
            notification.open({
                message: "Ошибка",
                description: "Выберите марку автомобиля",
            });
            return;
        }
        return true;
    };

    const formFields: IFormField[] = useMemo(
        () => [
            {
                title: "Модель",
                name: "title",
                type: "textField",
            },
            {
                title: "Марка",
                name: "brandId",
                type: "selectField",
                options: allBrand?.map(elem => ({
                    value: elem.id,
                    label: elem.title,
                })),
            },
        ],
        [allBrand],
    );

    return {
        helperLoading:
            addModelHelper.loading ||
            deleteModelHelper.loading ||
            updateModelHelper.loading ||
            allBrandsQuery.loading,
        formFields,
        allBrand,
        sendAddModel,
        sendDeleteModel,
        sendUpdateModel,
        validateForm,
    };
}

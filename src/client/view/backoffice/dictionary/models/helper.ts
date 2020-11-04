import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    ModelsMutationAddModelArgs,
    ModelsMutationDeleteModelArgs,
    Mutation,
} from "../../../../service/types/types";
import { ADD_MODEL } from "./gql/add-model";
import { DELETE_MODEL } from "./gql/delete-model";
import { UPDATE_MODEL } from "./gql/update-model";

export function useModelsHelper() {
    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };

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

    return {
        mutationLoading:
            addModelHelper.loading ||
            deleteModelHelper.loading ||
            updateModelHelper.loading,
        sendAddModel,
        sendDeleteModel,
        sendUpdateModel,
        validateForm,
    };
}

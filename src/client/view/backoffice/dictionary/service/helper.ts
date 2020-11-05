import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    Mutation,
    ServiceMutationAddServiceArgs,
    ServiceMutationDeleteServiceArgs,
    ServiceMutationUpdateServiceArgs,
} from "../../../../service/types/types";
import { ADD_SERVICE } from "./gql/add-service";
import { DELETE_SERVICE } from "./gql/delete-service";
import { UPDATE_SERVICE } from "./gql/update-service";

export function useServiceHelper() {
    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };

    const refetchQueries = ["AllServices"];

    const [addService, addServiceHelper] = useMutation<
        Mutation,
        ServiceMutationAddServiceArgs
    >(ADD_SERVICE, options);

    const [deleteService, deleteServiceHelper] = useMutation<
        Mutation,
        ServiceMutationDeleteServiceArgs
    >(DELETE_SERVICE, options);

    const [updateService, updateServiceHelper] = useMutation<
        Mutation,
        ServiceMutationUpdateServiceArgs
    >(UPDATE_SERVICE, options);

    const sendAddService = (title: string, price: number) => {
        addService({
            variables: {
                title,
                price,
            },
            refetchQueries,
        });
    };
    const sendDeleteService = (id: string) => {
        deleteService({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    const sendUpdateService = (id: string, title: string, price: number) => {
        updateService({
            variables: {
                id,
                title,
                price,
            },
            refetchQueries,
        });
    };

    return {
        loadingMutation:
            addServiceHelper.loading || deleteServiceHelper.loading,
        sendAddService,
        sendDeleteService,
        sendUpdateService,
    };
}

import { useMutation } from "@apollo/client";
import { IFormField } from "../../../../components/modal-form";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";
import {
    ClientInput,
    ClientsMutationAddClientArgs,
    ClientsMutationDeleteClientArgs,
    ClientsMutationUpdateClientArgs,
    Mutation,
} from "../../../../service/types/types";
import { ADD_CLIENT } from "./gql/add-client";
import { UPDATE_CLIENT } from "./gql/update-client";
import { DELETE_CLIENT } from "./gql/delete-client";

export const formFields = [
    {
        title: "Имя",
        name: "firstName",
        type: "textField",
    },
    {
        title: "Фамилия",
        name: "lastName",
        type: "textField",
    },
    {
        title: "Номер телефона",
        name: "phone",
        type: "phoneField",
    },
] as IFormField[];

export function useClientsHelper() {
    const options = useMutationOptions();

    const refetchQueries = ["AllClients"];

    const [addClient, addClientHelper] = useMutation<
        Mutation,
        ClientsMutationAddClientArgs
    >(ADD_CLIENT, options);

    const [updateClient, updateClientHelper] = useMutation<
        Mutation,
        ClientsMutationUpdateClientArgs
    >(UPDATE_CLIENT, options);

    const [deleteClient, deleteClientHelper] = useMutation<
        Mutation,
        ClientsMutationDeleteClientArgs
    >(DELETE_CLIENT, options);

    const sendAddClient = (data: ClientInput) => {
        addClient({
            variables: {
                data,
            },
            refetchQueries,
        });
    };
    const sendUpdateClient = (id: string, data: ClientInput) => {
        updateClient({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    const sendDeleteClient = (id: string) => {
        deleteClient({
            variables: {
                id,
            },
            refetchQueries,
        });
    };
    return {
        mutationLoading:
            addClientHelper.loading ||
            updateClientHelper.loading ||
            deleteClientHelper.loading,
        sendAddClient,
        sendUpdateClient,
        sendDeleteClient,
    };
}

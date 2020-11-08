import { useMutation } from "@apollo/client";
import { IFormField } from "../../../../components/modal-form";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";
import {
    Mutation,
    UserInput,
    UsersMutationAddUserArgs,
    UsersMutationDeleteUserArgs,
    UsersMutationUpdateUserArgs,
} from "../../../../service/types/types";
import { ADD_USER } from "./gql/add-user";
import { DELETE_USER } from "./gql/delete-user";
import { UPDATE_USER } from "./gql/update-user";

export function useUsersHelper() {
    const formFields = [
        {
            title: "Имя",
            name: "firstname",
            type: "textField",
        },
        {
            title: "Имя пользователя",
            name: "username",
            type: "textField",
        },
        {
            title: "Пароль",
            name: "password",
            type: "passwordField",
        },
    ] as IFormField[];

    const options = useMutationOptions();

    const refetchQueries = ["AllUsers"];

    const [addUser, addUserHelper] = useMutation<
        Mutation,
        UsersMutationAddUserArgs
    >(ADD_USER, options);

    const [deleteUser, deleteUserHelper] = useMutation<
        Mutation,
        UsersMutationDeleteUserArgs
    >(DELETE_USER, options);

    const [updateUser, updateUserHelper] = useMutation<
        Mutation,
        UsersMutationUpdateUserArgs
    >(UPDATE_USER, options);

    const sendAddUser = (data: UserInput) => {
        addUser({
            variables: {
                data,
            },
            refetchQueries,
        });
    };
    const sendDeleteUser = (id: string) => {
        deleteUser({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    const sendUpdateUser = (id: string, data: UserInput) => {
        updateUser({
            variables: {
                id,
                data,
            },
            refetchQueries,
        });
    };

    return {
        loadingMutation:
            addUserHelper.loading ||
            deleteUserHelper.loading ||
            updateUserHelper.loading,
        formFields,
        sendAddUser,
        sendDeleteUser,
        sendUpdateUser,
    };
}

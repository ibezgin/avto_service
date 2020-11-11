import { ApolloError, useMutation } from "@apollo/client";
import { IFormField } from "../../../../components/modal-form";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";
import { Specialization } from "../../../../service/enums/specialization";
import {
    Mutation,
    UserInput,
    UsersMutationAddUserArgs,
    UsersMutationDeleteUserArgs,
    UsersMutationUpdateUserArgs,
} from "../../../../service/types/types";
import { errorHandler } from "../../../../service/utils/error-handler";
import { ADD_USER } from "./gql/add-user";
import { DELETE_USER } from "./gql/delete-user";
import { UPDATE_USER } from "./gql/update-user";

export function useUsersHelper() {
    const positions = [
        {
            value: Specialization.ADMIN,
            label: "Руководство",
        },
        {
            value: Specialization.MANAGER,
            label: "Менеджер",
        },
        {
            value: Specialization.TECHNICAL,
            label: "Технический специалист",
        },
    ];
    const formFields = [
        {
            title: "Имя",
            name: "firstname",
            type: "textField",
        },
        {
            title: "Специализация",
            name: "position",
            type: "selectField",
            options: positions,
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
    >(ADD_USER, {
        ...options,
        onError: (error: ApolloError) => {
            errorHandler(error);
        },
    });

    const [deleteUser, deleteUserHelper] = useMutation<
        Mutation,
        UsersMutationDeleteUserArgs
    >(DELETE_USER, options);

    const [updateUser, updateUserHelper] = useMutation<
        Mutation,
        UsersMutationUpdateUserArgs
    >(UPDATE_USER, options);

    const sendAddUser = (data: UserInput) => {
        // eslint-disable-next-line no-console
        console.log(addUserHelper);
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
        positions,
        sendAddUser,
        sendDeleteUser,
        sendUpdateUser,
    };
}

import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    BrandMutationAddBrandArgs,
    BrandMutationDeleteBrandArgs,
    Mutation,
    BrandMutationUpdateBrandArgs,
} from "../../../../service/types/types";
import { ADD_BRAND } from "./gql/add-brand";
import { DELETE_BRAND } from "./gql/delete-brand";
import { UPDATE_BRAND } from "./gql/update-brand";
export function useDictionaryBrandHelper() {
    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    };
    const [addBrand, addBrandProps] = useMutation<
        Mutation,
        BrandMutationAddBrandArgs
    >(ADD_BRAND, options);

    const [deleteBrand, deleteBrandProps] = useMutation<
        Mutation,
        BrandMutationDeleteBrandArgs
    >(DELETE_BRAND, options);
    const [updateBrand, updateBrandProps] = useMutation<
        Mutation,
        BrandMutationUpdateBrandArgs
    >(UPDATE_BRAND, options);

    const sendAddBrand = (
        title: string,
        setVisible: (value: boolean) => void,
    ) => {
        addBrand({
            variables: {
                title,
            },
            refetchQueries: ["AllBrand"],
        }).then(() => {
            setVisible(false);
        });
    };

    const sendDeleteBrand = (id: string) => {
        deleteBrand({
            variables: {
                id,
            },
            refetchQueries: ["AllBrand"],
        });
    };
    const sendUpdateBrand = (
        id: string,
        title: string,
        setVisible: (value: boolean) => void,
    ) => {
        updateBrand({
            variables: {
                id,
                title,
            },
            refetchQueries: ["AllBrand"],
        }).then(() => {
            setVisible(false);
        });
    };
    return {
        sendAddBrand,
        sendDeleteBrand,
        sendUpdateBrand,
        loadingMutation:
            addBrandProps.loading ||
            deleteBrandProps.loading ||
            updateBrandProps.loading,
    };
}

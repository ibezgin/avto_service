import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    BrandMutationAddBrandArgs,
    BrandMutationDeleteBrandArgs,
    Mutation,
} from "../../../../service/types/types";
import { ADD_BRAND } from "./gql/add-brand";
import { DELETE_BRAND } from "./gql/delete-brand";
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
    return {
        sendAddBrand,
        sendDeleteBrand,
        loadingMutation: addBrandProps.loading || deleteBrandProps.loading,
    };
}

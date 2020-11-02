import { useMutation } from "@apollo/client";
import { notification } from "antd";
import {
    BrandMutationAddBrandArgs,
    Mutation,
} from "../../../../service/types/types";
import { ADD_BRAND } from "./gql/add-brand";
export function useDictionaryBrandHelper() {
    const [addBrand, addBrandProps] = useMutation<
        Mutation,
        BrandMutationAddBrandArgs
    >(ADD_BRAND, {
        onCompleted: () => {
            notification.success({ message: "Успех" });
        },
        onError: () => {
            notification.error({ message: "Ошибка" });
        },
    });

    const sendAddBrand = (title: string) => {
        addBrand({
            variables: {
                title,
            },
        });
    };

    return {
        sendAddBrand,
        loadingMutation: addBrandProps.loading,
    };
}

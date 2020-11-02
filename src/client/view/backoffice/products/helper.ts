import { useMutation, gql } from "@apollo/client";
import { ProductsMutationAddProductArgs, ProductInput, ProductsMutationUpdateProductArgs, ProductsMutationDeleteProductArgs } from "../../../service/types/types";
import { notification } from "antd";
import { useCallback } from "react";


const ADD_PRODUCT = gql`
    mutation AddProduct($value:ProductInput){
        products{
            addProduct(value: $value)
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($value:ProductInput){
        products{
            updateProduct(value: $value)
        }
    }
`;

const REMOVE_PRODUCT = gql`
    mutation DeleteProduct($id:String){
        products{
            deleteProduct(id: $id)
        }
    }
`;

export function useProductHelper(refetch: () => void, setVisible: (value: boolean) => void) {

    const options = {
        onCompleted: () => {
            notification.success({ message: "Успех!", description: "Данные обновлены" });
            refetch();
            setVisible(false);
        },
        onError: () => {
            notification.error({ message: "Проищошла ошибка" });
        },
    };
    const [addProductMutation] = useMutation<any, ProductsMutationAddProductArgs>(ADD_PRODUCT, options);
    const [updateProductMutation] = useMutation<any, ProductsMutationUpdateProductArgs>(UPDATE_PRODUCT, options);
    const [deleteProductMutation] = useMutation<any, ProductsMutationDeleteProductArgs>(REMOVE_PRODUCT, options);

    const addProduct = useCallback((value: ProductInput) => {
        addProductMutation({
            variables: {
                value,
            },
        });
    }, [addProductMutation]);

    const updateProduct = useCallback((value: ProductInput) => {
        updateProductMutation({
            variables: {
                value,
            },
        });
    }, [updateProductMutation]);

    const deleteProduct = useCallback((id: string) => {
        deleteProductMutation({
            variables: {
                id,
            },
        });
    }, [deleteProductMutation]);

    return {
        addProduct,
        updateProduct,
        deleteProduct,
    };
}

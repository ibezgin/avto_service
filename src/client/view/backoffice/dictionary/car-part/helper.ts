import { useMutation } from "@apollo/client";
import { useMutationOptions } from "../../../../hooks/use-mutation-options";
import {
    CarPartMutationAddCarPartArgs,
    CarPartMutationDeleteCarPartArgs,
    CarPartMutationUpdateCarPartArgs,
    Mutation,
} from "../../../../service/types/types";
import { ADD_CAR_PART } from "./gql/add-car-part";
import { DELETE_CAR_PART } from "./gql/delete-car-part";
import { UPDATE_CAR_PART } from "./gql/update-car-part";

export function useCarPartHelper() {
    const options = useMutationOptions();

    const refetchQueries = ["AllCarParts"];

    const [addCarPart, addCarPartHelper] = useMutation<
        Mutation,
        CarPartMutationAddCarPartArgs
    >(ADD_CAR_PART, options);

    const [updateCarPart, updateCarPartHelper] = useMutation<
        Mutation,
        CarPartMutationUpdateCarPartArgs
    >(UPDATE_CAR_PART, options);

    const [deleteCarPart, deleteCarPartHelper] = useMutation<
        Mutation,
        CarPartMutationDeleteCarPartArgs
    >(DELETE_CAR_PART, options);

    const sendAddCarPart = (title: string, price: number) => {
        addCarPart({
            variables: {
                title,
                price,
            },
            refetchQueries,
        });
    };

    const sendUpdateCarPart = (id: string, title: string, price: number) => {
        updateCarPart({
            variables: {
                id,
                title,
                price,
            },
            refetchQueries,
        });
    };
    const sendDeleteCarPart = (id: string) => {
        deleteCarPart({
            variables: {
                id,
            },
            refetchQueries,
        });
    };

    return {
        mutationLoading:
            addCarPartHelper.loading ||
            updateCarPartHelper.loading ||
            deleteCarPartHelper.loading,
        sendUpdateCarPart,
        sendAddCarPart,
        sendDeleteCarPart,
    };
}

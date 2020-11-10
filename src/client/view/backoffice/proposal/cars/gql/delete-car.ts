import { gql } from "@apollo/client";

export const DELETE_CAR = gql`
    mutation DeleteCar($id: String!) {
        cars {
            deleteCar(id: $id)
        }
    }
`;

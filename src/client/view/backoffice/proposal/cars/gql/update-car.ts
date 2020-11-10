import { gql } from "@apollo/client";

export const UPDATE_CAR = gql`
    mutation UpdateCar($id: String!, $data: CarInput!) {
        cars {
            updateCar(id: $id, data: $data)
        }
    }
`;

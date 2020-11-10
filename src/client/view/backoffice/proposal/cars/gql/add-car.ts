import { gql } from "@apollo/client";

export const ADD_CAR = gql`
    mutation AddCar($data: CarInput!) {
        cars {
            addCar(data: $data)
        }
    }
`;

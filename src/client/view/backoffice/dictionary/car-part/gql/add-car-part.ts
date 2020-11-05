import { gql } from "@apollo/client";

export const ADD_CAR_PART = gql`
    mutation AddCarPart($title: String!, $price: Float!) {
        carPart {
            addCarPart(title: $title, price: $price)
        }
    }
`;

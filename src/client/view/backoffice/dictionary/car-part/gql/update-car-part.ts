import { gql } from "@apollo/client";

export const UPDATE_CAR_PART = gql`
    mutation UpdateCarPart($id: String!, $title: String!, $price: Float!) {
        carPart {
            updateCarPart(id: $id, title: $title, price: $price)
        }
    }
`;

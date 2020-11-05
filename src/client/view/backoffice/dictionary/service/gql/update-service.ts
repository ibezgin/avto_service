import { gql } from "@apollo/client";

export const UPDATE_SERVICE = gql`
    mutation UpdateService($id: String!, $title: String!, $price: Float!) {
        service {
            updateService(id: $id, title: $title, price: $price)
        }
    }
`;

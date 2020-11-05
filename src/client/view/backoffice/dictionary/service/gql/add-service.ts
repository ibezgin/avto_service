import { gql } from "@apollo/client";

export const ADD_SERVICE = gql`
    mutation AddService($title: String!, $price: Float!) {
        service {
            addService(title: $title, price: $price)
        }
    }
`;

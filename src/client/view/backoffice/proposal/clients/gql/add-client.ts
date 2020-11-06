import { gql } from "@apollo/client";

export const ADD_CLIENT = gql`
    mutation AddClient($data: ClientInput!) {
        clients {
            addClient(data: $data)
        }
    }
`;

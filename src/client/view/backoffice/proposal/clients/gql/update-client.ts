import { gql } from "@apollo/client";

export const UPDATE_CLIENT = gql`
    mutation UpdateClient($id: String!, $data: ClientInput!) {
        clients {
            updateClient(id: $id, data: $data)
        }
    }
`;

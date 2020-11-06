import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
    mutation DeleteClient($id: String!) {
        clients {
            deleteClient(id: $id)
        }
    }
`;

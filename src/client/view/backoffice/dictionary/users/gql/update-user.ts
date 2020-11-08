import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UpdateUser($id: String!, $data: UserInput!) {
        users {
            updateUser(id: $id, data: $data)
        }
    }
`;

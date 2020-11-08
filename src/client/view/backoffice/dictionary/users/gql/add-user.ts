import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation AddUser($data: UserInput) {
        users {
            addUser(data: $data)
        }
    }
`;

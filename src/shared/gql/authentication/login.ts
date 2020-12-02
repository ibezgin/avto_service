import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($username: String, $password: String) {
        authentication {
            login(username: $username, password: $password) {
                id
                username
            }
        }
    }
`;

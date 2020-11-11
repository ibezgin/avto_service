import { gql } from "@apollo/client";

export const ALL_USERS = gql`
    query AllUsers {
        users {
            allUsers {
                id
                firstname
                username
                position
            }
        }
    }
`;

import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
    query CurrentUser {
        authentication {
            currentUser {
                id
                firstname
                username
            }
        }
    }
`;

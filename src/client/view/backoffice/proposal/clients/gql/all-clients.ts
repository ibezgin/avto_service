import { gql } from "@apollo/client";

export const ALL_CLIENTS = gql`
    query AllClients {
        clients {
            allClients {
                id
                firstName
                lastName
                phone
            }
        }
    }
`;

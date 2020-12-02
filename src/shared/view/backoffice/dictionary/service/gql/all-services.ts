import { gql } from "@apollo/client";

export const ALL_SERVICES = gql`
    query AllServices {
        service {
            allServices {
                id
                title
                price
            }
        }
    }
`;

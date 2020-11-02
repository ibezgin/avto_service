import { gql } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/camelcase
export const ADD_BRAND = gql`
    mutation AddBrand($title: String!) {
        brand {
            addBrand(title: $title)
        }
    }
`;

import { gql } from "@apollo/client";

export const UPDATE_BRAND = gql`
    mutation UpdateBrand($id: String!, $title: String!) {
        brand {
            updateBrand(id: $id, title: $title)
        }
    }
`;

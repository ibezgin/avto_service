import { gql } from "@apollo/client";

export const DELETE_BRAND = gql`
    mutation DeleteBrand($id: String!) {
        brand {
            deleteBrand(id: $id)
        }
    }
`;

import { gql } from "@apollo/client";

export const ADD_MODEL = gql`
    mutation AddModel($title: String!, $brandId: String!) {
        models {
            addModel(title: $title, brandId: $brandId)
        }
    }
`;

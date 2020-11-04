import { gql } from "@apollo/client";

export const UPDATE_MODEL = gql`
    mutation UpdateModel($id: String!, $title: String!, $brandId: String!) {
        models {
            updateModel(id: $id, title: $title, brandId: $brandId)
        }
    }
`;

import { gql } from "@apollo/client";

export const DELETE_MODEL = gql`
    mutation DeleteModel($id: String!) {
        models {
            deleteModel(id: $id)
        }
    }
`;

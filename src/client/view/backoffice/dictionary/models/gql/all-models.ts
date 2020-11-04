import { gql } from "@apollo/client";

export const ALL_MODELS = gql`
    query AllModels {
        models {
            allModels {
                id
                brandId
                title
            }
        }
    }
`;

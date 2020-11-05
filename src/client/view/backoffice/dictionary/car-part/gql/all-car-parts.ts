import { gql } from "@apollo/client";

export const ALL_CAR_PARTS = gql`
    query AllCarParts {
        carPart {
            allCarParts {
                id
                title
                price
            }
        }
    }
`;

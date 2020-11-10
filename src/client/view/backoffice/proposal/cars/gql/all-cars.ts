import { gql } from "@apollo/client";

export const ALL_CARS = gql`
    query AllCars {
        cars {
            allCars {
                id
                brandId
                modelId
                clientId
                gosNumber
                color
            }
        }
    }
`;

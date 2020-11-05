import { gql } from "@apollo/client";

export const DELETE_CAR_PART = gql`
    mutation DeleteCarPart($id: String!) {
        carPart {
            deleteCarPart(id: $id)
        }
    }
`;

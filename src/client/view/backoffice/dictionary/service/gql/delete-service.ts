import { gql } from "@apollo/client";

export const DELETE_SERVICE = gql`
    mutation DeleteService($id: String!) {
        service {
            deleteService(id: $id)
        }
    }
`;

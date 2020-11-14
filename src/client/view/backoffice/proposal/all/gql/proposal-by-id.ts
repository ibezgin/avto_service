import { gql } from "@apollo/client";

export const PROPOSAL_BY_ID = gql`
    query ProposalById($id: String!) {
        proposal {
            proposalById(id: $id) {
                id
                createTime
                changeTime
                status
                clientId
                carId
                userId
                proposalReason
                technicalInspectionResult
                recomendedWork
                completedWork
            }
        }
    }
`;

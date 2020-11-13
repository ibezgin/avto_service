import { gql } from "@apollo/client";

export const ALL_PROPOSALS = gql`
    query AllProposals {
        proposal {
            allProposals {
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

import { gql } from "@apollo/client";

export const ALL_PROPOSALS = gql`
    query AllProposals {
        proposal {
            all_proposals {
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

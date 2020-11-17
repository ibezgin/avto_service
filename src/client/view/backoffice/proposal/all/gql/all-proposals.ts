import { gql } from "@apollo/client";

export const ALL_PROPOSALS = gql`
    query AllProposals($assignedToMe: Boolean) {
        proposal {
            allProposals(assignedToMe: $assignedToMe) {
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

import { gql } from "@apollo/client";

export const ALL_PROPOSALS = gql`
    query AllProposals($assignedToMe: Boolean, $clientId: String) {
        proposal {
            allProposals(assignedToMe: $assignedToMe, clientId: $clientId) {
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

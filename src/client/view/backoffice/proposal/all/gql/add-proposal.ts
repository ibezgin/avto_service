import { gql } from "@apollo/client";

export const ADD_PROPOSAL = gql`
    mutation AddProposal($data: ProposalInput!) {
        proposal {
            addProposal(data: $data)
        }
    }
`;

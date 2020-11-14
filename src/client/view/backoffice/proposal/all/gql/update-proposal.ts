import { gql } from "@apollo/client";

export const UPDATE_PROPOSAL = gql`
    mutation UpdateProposal($id: String!, $data: ProposalInput) {
        proposal {
            updateProposal(id: $id, data: $data)
        }
    }
`;

import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        proposal: ProposalQuery!
    }
    extend type Mutation {
        proposal: ProposalMutation!
    }
    type ProposalQuery {
        allProposals: [ProposalType!]!
        proposalById(id: String!): ProposalType!
    }
    type ProposalMutation {
        addProposal(data: ProposalInput!): Boolean
        deleteProposal(id: String!): Boolean
        updateProposal(id: String!, data: ProposalInput): Boolean
    }

    type ProposalType {
        id: String!
        createTime: String!
        changeTime: String!
        status: Int!
        clientId: String!
        carId: String!
        userId: String
        proposalReason: String
        technicalInspectionResult: String
        recomendedWork: [String]
        completedWork: JSON
    }

    input ProposalInput {
        createTime: String!
        changeTime: String!
        status: Int!
        clientId: String!
        carId: String!
        userId: String!
        proposalReason: String
        technicalInspectionResult: String
        recomendedWork: [String]
        completedWork: JSON
    }
`;

export const proposalSubSchema = new SubSchema(types, {
    Query: {
        proposal: () => ({}),
    },
    Mutation: {
        proposal: () => ({}),
    },
    ProposalQuery: {
        allProposals: async (obj, props, { helpers }) =>
            await helpers.sections.proposal.allProposals(),
        proposalById: async (obj, { id }, { helpers }) =>
            await helpers.sections.proposal.getProposalById(id),
    },
    ProposalMutation: {
        addProposal: async (obj, { data }, { helpers }) =>
            await helpers.sections.proposal.addProposal(data),
        deleteProposal: async (obj, { id }, { helpers }) =>
            await helpers.sections.proposal.deleteProposal(id),
        updateProposal: async (obj, { id, data }, { helpers }) =>
            await helpers.sections.proposal.updateProposal(id, data),
    },
});

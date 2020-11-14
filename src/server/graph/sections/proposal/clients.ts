import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        clients: ClientsQuery!
    }
    extend type Mutation {
        clients: ClientsMutation!
    }
    type ClientsQuery {
        allClients: [ClientType!]!
    }
    type ClientsMutation {
        addClient(data: ClientInput!): Boolean
        deleteClient(id: String!): Boolean
        updateClient(id: String!, data: ClientInput!): Boolean
    }

    type ClientType {
        id: String!
        firstName: String!
        lastName: String!
        phone: String!
        createTime: String!
    }

    input ClientInput {
        firstName: String!
        lastName: String!
        phone: String!
        createTime: String!
    }
`;

export const proposalClientsSubSchema = new SubSchema(types, {
    Query: {
        clients: () => ({}),
    },
    Mutation: {
        clients: () => ({}),
    },
    ClientsQuery: {
        allClients: async (obj, props, { helpers }) =>
            await helpers.sections.clients.allClients(),
    },
    ClientsMutation: {
        addClient: async (obj, { data }, { helpers }) =>
            await helpers.sections.clients.addClient(data),
        deleteClient: async (obj, { id }, { helpers }) =>
            await helpers.sections.clients.deleteClient(id),
        updateClient: async (obj, { id, data }, { helpers }) =>
            await helpers.sections.clients.updateClient(id, data),
    },
});

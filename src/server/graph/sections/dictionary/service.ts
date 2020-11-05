import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        service: ServiceQuery!
    }
    extend type Mutation {
        service: ServiceMutation!
    }
    type ServiceQuery {
        allServices: [ServiceType!]!
    }
    type ServiceMutation {
        addService(title: String!, price: Float!): Boolean
        deleteService(id: String!): Boolean
        updateService(id: String!, title: String!, price: Float!): Boolean
    }

    type ServiceType {
        id: String!
        title: String!
        price: Float!
    }
`;

export const dictionaryServiceSubSchema = new SubSchema(types, {
    Query: {
        service: () => ({}),
    },
    Mutation: {
        service: () => ({}),
    },
    ServiceQuery: {
        allServices: async (obj, props, { helpers }) =>
            await helpers.sections.service.allServices(),
    },
    ServiceMutation: {
        addService: async (obj, { title, price }, { helpers }) =>
            await helpers.sections.service.addService(title, price),
        deleteService: async (obj, { id }, { helpers }) =>
            await helpers.sections.service.deleteService(id),
        updateService: async (obj, { id, title, price }, { helpers }) =>
            await helpers.sections.service.updateService(id, title, price),
    },
});

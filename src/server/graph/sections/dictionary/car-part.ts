import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        carPart: CarPartQuery!
    }
    extend type Mutation {
        carPart: CarPartMutation!
    }
    type CarPartQuery {
        allCarParts: [CarPartType!]!
    }
    type CarPartMutation {
        addCarPart(title: String!, price: Float!): Boolean
        deleteCarPart(id: String!): Boolean
        updateCarPart(id: String!, title: String!, price: Float!): Boolean
    }

    type CarPartType {
        id: String!
        title: String!
        price: Float!
    }
`;

export const dictionaryCarPartSubSchema = new SubSchema(types, {
    Query: {
        carPart: () => ({}),
    },
    Mutation: {
        carPart: () => ({}),
    },
    CarPartQuery: {
        allCarParts: async (obj, props, { helpers }) =>
            await helpers.sections.carPart.allCarParts(),
    },
    CarPartMutation: {
        addCarPart: async (obj, { title, price }, { helpers }) =>
            await helpers.sections.carPart.addCarPart(title, price),
        deleteCarPart: async (obj, { id }, { helpers }) =>
            await helpers.sections.carPart.deleteCarPart(id),
        updateCarPart: async (obj, { id, title, price }, { helpers }) =>
            await helpers.sections.carPart.updateCarPart(id, title, price),
    },
});

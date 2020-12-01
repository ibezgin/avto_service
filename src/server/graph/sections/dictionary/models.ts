import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        models: ModelsQuery!
    }
    extend type Mutation {
        models: ModelsMutation!
    }
    type ModelsQuery {
        allModels: [ModelType!]!
    }
    type ModelsMutation {
        addModel(title: String!, brandId: String!): Boolean
        deleteModel(id: String!): Boolean
        updateModel(id: String!, title: String!, brandId: String): Boolean
    }

    type ModelType {
        id: String!
        brandId: String
        title: String!
    }
`;

export const dictionaryModelsSubSchema = new SubSchema(types, {
    Query: {
        models: () => ({}),
    },
    Mutation: {
        models: () => ({}),
    },
    ModelsQuery: {
        allModels: async (obj, props, { helpers }) =>
            await helpers.sections.models.allModels(),
    },
    ModelsMutation: {
        addModel: async (obj, { brandId, title }, { helpers }) =>
            await helpers.sections.models.addModel(brandId, title),
        deleteModel: async (obj, { id }, { helpers }) =>
            await helpers.sections.models.deleteModel(id),
        updateModel: async (obj, { id, title, brandId }, { helpers }) =>
            await helpers.sections.models.updateModel(id, brandId, title),
    },
});

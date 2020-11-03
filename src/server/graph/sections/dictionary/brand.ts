import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        brand: BrandQuery!
    }
    extend type Mutation {
        brand: BrandMutation!
    }
    type BrandQuery {
        allBrands: [BrandType!]!
    }
    type BrandMutation {
        addBrand(title: String!): Boolean
        deleteBrand(id: String!): Boolean
        updateBrand(id: String!, title: String!): Boolean
    }

    type BrandType {
        _id: String!
        title: String!
    }
`;

export const dictionaryBrandSubSchema = new SubSchema(types, {
    Query: {
        brand: () => ({}),
    },
    Mutation: {
        brand: () => ({}),
    },
    BrandQuery: {
        allBrands: async (obj, props, { helpers }) =>
            await helpers.sections.brand.allBrands(),
    },
    BrandMutation: {
        addBrand: async (obj, { title }, { helpers }) =>
            await helpers.sections.brand.addBrand(title),
        deleteBrand: async (obj, { title }, { helpers }) =>
            await helpers.sections.brand.deleteBrand(title),
        updateBrand: async (obj, { id, title }, { helpers }) =>
            await helpers.sections.brand.updateBrand(id, title),
    },
});

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
        id: String!
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
        allBrands: async (_obj, _props, { helpers }) =>
            await helpers.sections.brand.allBrands(),
    },
    BrandMutation: {
        addBrand: async (_obj, { title }, { helpers }) =>
            await helpers.sections.brand.addBrand(title),
        deleteBrand: async (_obj, { id }, { helpers }) =>
            await helpers.sections.brand.deleteBrand(id),
        updateBrand: async (_obj, { id, title }, { helpers }) =>
            await helpers.sections.brand.updateBrand(id, title),
    },
});

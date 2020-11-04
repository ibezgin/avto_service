import { querySubSchema } from "./query";
import { SubSchema } from "./sub-schema";
import { IResolvers } from "apollo-server-express";

import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { dictionaryBrandSubSchema } from "./sections/dictionary/brand";
import { dictionaryModelsSubSchema } from "./sections/dictionary/models";

export const sections: SubSchema[] = [
    dictionaryBrandSubSchema,
    dictionaryModelsSubSchema,
];

export const schemas: SubSchema[] = [...sections, querySubSchema];

export function buildGraphqlSchema() {
    const resolvers: Array<IResolvers<any, any>> = [];

    const types: any = [];

    for (const objects of schemas) {
        const { resolverMap, typeDefs } = objects;
        resolvers.push(resolverMap);
        types.push(typeDefs);
    }

    const schema = makeExecutableSchema({
        typeDefs: mergeTypeDefs(types),
        resolvers: mergeResolvers(resolvers),
    });

    return schema;
}

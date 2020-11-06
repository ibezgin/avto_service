import { querySubSchema } from "./query";
import { SubSchema } from "./sub-schema";
import { IResolvers } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { dictionaryBrandSubSchema } from "./sections/dictionary/brand";
import { dictionaryModelsSubSchema } from "./sections/dictionary/models";
import { dictionaryServiceSubSchema } from "./sections/dictionary/service";
import { dictionaryCarPartSubSchema } from "./sections/dictionary/car-part";
import { proposalClientsSubSchema } from "./sections/proposal/clients";

export const sections: SubSchema[] = [
    dictionaryBrandSubSchema,
    dictionaryModelsSubSchema,
    dictionaryServiceSubSchema,
    dictionaryCarPartSubSchema,
    proposalClientsSubSchema,
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

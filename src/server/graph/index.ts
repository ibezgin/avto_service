import { ApolloServer, IResolvers } from "apollo-server-express";

import { makeExecutableSchema } from "graphql-tools";
import { RequestContext } from "../request-context";
import { schemas } from "./sections";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";

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

export const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => new RequestContext(req),
});

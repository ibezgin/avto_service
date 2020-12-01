import { ApolloServer } from "apollo-server-express";
import { RequestContext } from "../request-context";
import { buildGraphqlSchema } from "./sections";

const schema = buildGraphqlSchema();

export const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => new RequestContext(req, res),
});

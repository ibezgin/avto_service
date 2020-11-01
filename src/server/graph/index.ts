import { ApolloServer, gql } from "apollo-server-express";

import { makeExecutableSchema } from "graphql-tools";
import { userResolvers, userTypeDeff } from "./user";
import { RequestContext } from "../request-context";
import { newsResolvers, newsTypeDeff } from "./news";
import { productsTypeDeff, productsResolvers } from "./products";

const queryType = gql`
    type Query {
        _keep: Boolean
    }
    type Mutation {
        _keep: Boolean
    }
`;

const typeDefs = [queryType, userTypeDeff, newsTypeDeff, productsTypeDeff];

const resolversArray = [userResolvers, newsResolvers, productsResolvers];

let queryResults = {};
let mutationResults = {};

resolversArray.forEach(elem => {
    const query: any = elem.Query;
    const mutation: any = elem.Mutation;
    // eslint-disable-next-line guard-for-in
    for (const key in query) {
        if (query[key]) {
            queryResults = { ...queryResults, [key]: query[key] };
        }
    }
    for (const key in mutation) {
        if (mutation[key]) {
            mutationResults = { ...mutationResults, [key]: mutation[key] };
        }
    }
});

const resolvers = {
    ...userResolvers,
    ...newsResolvers,
    ...productsResolvers,
    ["Query"]: { ...queryResults },
    ["Mutation"]: { ...mutationResults },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => new RequestContext(req),
});

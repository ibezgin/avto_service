import { SubSchema } from "../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        authentication: AuthenticationQuery!
    }
    extend type Mutation {
        authentication: AuthenticationMutation!
    }
    type AuthenticationQuery {
        currentUser: LoginType
    }
    type AuthenticationMutation {
        login(data: LoginInput): Boolean
    }

    type LoginType {
        username: String
    }
    input LoginInput {
        username: String
        passpord: String
    }
`;

export const authenticationSubSchema = new SubSchema(types, {
    Query: {
        brand: () => ({}),
    },
    Mutation: {
        brand: () => ({}),
    },
    AuthenticationQuery: {
        currentUser: async (obj, params, context) => {
            return await context.authentification.getUser();
        },
    },

    AuthenticationMutation: {
        login: async (obj, { username, password }, context) => {
            const { user } = await context.authentification.authenticate(
                "graphql-local",
                {
                    username,
                    password,
                },
            );

            await context.authentification.login(user);

            return { user };
        },
    },
});

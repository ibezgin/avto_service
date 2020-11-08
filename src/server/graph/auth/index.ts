import { SubSchema } from "../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Mutation {
        authentication: AuthenticationMutation!
    }
    type AuthenticationMutation {
        login(data: LoginInput): Boolean
    }

    input LoginInput {
        username: String
        passpord: String
    }
`;

export const authenticationSubSchema = new SubSchema(types, {
    Mutation: {
        brand: () => ({}),
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

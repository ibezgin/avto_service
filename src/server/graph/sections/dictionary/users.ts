import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        users: UsersQuery!
    }
    extend type Mutation {
        users: UsersMutation!
    }
    type UsersQuery {
        allUsers: [UserType]
    }
    type UsersMutation {
        addUser(data: UserInput): Boolean
        deleteUser(id: String!): Boolean
        updateUser(id: String!, data: UserInput!): Boolean
    }

    type UserType {
        id: String!
        firstname: String!
        lastname: String!
        username: String!
        permission: JSON
        position: String!
    }

    input UserInput {
        firstname: String!
        lastname: String!
        username: String!
        password: String
        permission: JSON
        position: String!
    }
`;

export const dictionaryUsersSubSchema = new SubSchema(types, {
    Query: {
        users: () => ({}),
    },
    Mutation: {
        users: () => ({}),
    },
    UsersQuery: {
        allUsers: async (_obj, _props, { helpers }) =>
            await helpers.sections.users.allUsers(),
    },
    UsersMutation: {
        addUser: async (_obj, { data }, { helpers }) =>
            await helpers.sections.users.addUser(data),
        deleteUser: async (_obj, { id }, { helpers }) =>
            await helpers.sections.users.deleteUser(id),
        updateUser: async (_obj, { id, data }, { helpers }) =>
            await helpers.sections.users.updateUser(id, data),
    },
});

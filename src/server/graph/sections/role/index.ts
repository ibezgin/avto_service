import { SubSchema } from "../../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        role: RoleQuery!
    }
    extend type Mutation {
        role: RoleMutation!
    }
    type RoleQuery {
        allRoles: [RoleType!]!
    }
    type RoleMutation {
        addRole(title: String!, permission: JSON): Boolean
    }

    type RoleType {
        _id: String!
        title: String!
        permission: JSON
    }
`;

export const roleSubSchema = new SubSchema(types, {
    Query: {
        role: () => ({}),
    },
    Mutation: {
        role: () => ({}),
    },
    RoleQuery: {
        allRoles: async (obj, props, { helpers }) =>
            await helpers.sections.role.getAll(),
    },
    RoleMutation: {
        addRole: async (obj, { title, content }, { helpers }) =>
            await helpers.sections.role.addRole(title, content),
    },
});

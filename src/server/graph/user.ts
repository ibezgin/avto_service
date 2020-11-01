import { gql, IResolvers } from "apollo-server-express";
import { RequestContext } from "../request-context";

export const userTypeDeff = gql`
    extend type Query {
        users: UsersQuery!
    }
    type UsersQuery{
        allUsers: [UserType]
    }
    type UserType{
        _id:String
        firstname:String
    }
`;
export const userResolvers: IResolvers<any, RequestContext> = {
    Query: {
        users: () => ({}),
    },
    UsersQuery: {
        allUsers: async (obj, props, { helpers }) => await helpers.sections.user.getAll(),
    },
};

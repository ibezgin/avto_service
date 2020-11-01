import { gql, IResolvers } from "apollo-server-express";
import { RequestContext } from "../request-context";

export const newsTypeDeff = gql`
    extend type Query {
        news: NewsQuery!
    }
    extend type Mutation {
        news: NewsMutation!
    }
    type NewsQuery{
        allNews: [NewsType]
    }
    type NewsMutation {
        addNews(title:String, content:String):Boolean
        updateNews(value: NewsInput):Boolean
        deleteNews(id:String):Boolean
    }
    type NewsType{
        _id:String
        title:String
        content:String
    }
    input NewsInput {
        _id:String
        title:String
        content:String
    }
`;
export const newsResolvers: IResolvers<any, RequestContext> = {
    Query: {
        news: () => ({}),
    },
    Mutation: {
        news: () => ({}),
    },
    NewsQuery: {
        allNews: async (obj, props, { helpers }) => await helpers.sections.news.getAll(),
    },
    NewsMutation: {
        addNews: (obj, { title, content }, { helpers }) => helpers.sections.news.addNews(title, content),
        updateNews: async (obj, { value }, { helpers }) => await helpers.sections.news.updateNews(value),
        deleteNews: async (obj, { id }, { helpers }) => await helpers.sections.news.deleteNews(id),
    },
};

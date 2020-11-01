import { SubSchema } from "../sub-schema";
import { loadSchema } from "@graphql-tools/load";

import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

export const newsSubSchema = async () => {
    const schema = await loadSchema("./schema.graphql", {
        // load from a single schema file
        loaders: [new GraphQLFileLoader()],
    });
    return new SubSchema(schema as any, {
        Query: {
            news: () => ({}),
        },
        Mutation: {
            news: () => ({}),
        },
        NewsQuery: {
            allNews: async (obj, props, { helpers }) =>
                await helpers.sections.news.getAll(),
        },
        NewsMutation: {
            addNews: (obj, { title, content }, { helpers }) =>
                helpers.sections.news.addNews(title, content),
            updateNews: async (obj, { value }, { helpers }) =>
                await helpers.sections.news.updateNews(value),
            deleteNews: async (obj, { id }, { helpers }) =>
                await helpers.sections.news.deleteNews(id),
        },
    });
};

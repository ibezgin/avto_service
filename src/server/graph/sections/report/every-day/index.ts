import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const reportEveryDaySubSchema = new SubSchema(schema, {
    Query: {
        reportEveryDay: () => ({}),
    },
    ReportEveryDayQuery: {
        report: async (_obj, _props, { helpers }) =>
            await helpers.sections.reportEveryDay.report(),
    },
});

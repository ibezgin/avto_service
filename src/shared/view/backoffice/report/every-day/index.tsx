import React from "react";
import { Filter } from "components/filter";
import EVERY_DAY from "./gql/every-day.gql";
import { ReportEveryDay } from "gql/types/operation-result-types";

export const ReportEveryDayComponent = React.memo(() => {
    return (
        <Filter<ReportEveryDay>
            filterItems={["periods"]}
            query={EVERY_DAY}
            skip={true}
        >
            {({ data }) => {
                // eslint-disable-next-line no-console
                console.log(data);
                return <></>;
            }}
        </Filter>
    );
});

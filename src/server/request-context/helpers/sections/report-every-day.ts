import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import _ from "lodash";
import moment from "moment";

export class ReportEveryDayContextHelper extends AbstractRequestContextHelper {
    public async report() {
        const allProposals = await this.context.helpers.sections.proposal.allProposals();
        let result: any = [];

        _.forIn(
            _.groupBy(allProposals, elem =>
                moment(Number(elem.createTime) * 1000).startOf("day"),
            ),
            (value, key) => {
                result = [
                    ...result,
                    { key: moment(key).format("X"), value: value.length },
                ];
            },
        );

        return result;
    }
}

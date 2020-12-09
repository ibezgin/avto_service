import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";

export class ReportEveryDayContextHelper extends AbstractRequestContextHelper {
    public async report() {
        const allProposals = await this.context.helpers.sections.proposal.allProposals();
        return allProposals;
    }
}

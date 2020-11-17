import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ProposalEntity } from "../../../db/entities/proposal";

export class ProposalContextHelper extends AbstractRequestContextHelper {
    public async allProposals(assignedToMe: boolean) {
        return await (
            await this.context.helpers.database.filteredGetAll<ProposalEntity>(
                ProposalEntity,
                { assignedToMe },
            )
        ).sort((a: any, b: any) => b.createTime - a.createTime);
    }
    public async getProposalById(id: string) {
        return await this.context.helpers.database.getById<ProposalEntity>(
            ProposalEntity,
            id,
        );
    }

    public async addProposal(data: any) {
        return await this.context.helpers.database.add<ProposalEntity>(
            ProposalEntity,
            data,
        );
    }

    public async deleteProposal(id: string) {
        return await this.context.helpers.database.delete<ProposalEntity>(
            ProposalEntity,
            id,
        );
    }

    public async updateProposal(id: string, data: any) {
        return await this.context.helpers.database.update<ProposalEntity>(
            ProposalEntity,
            id,
            data,
        );
    }
}

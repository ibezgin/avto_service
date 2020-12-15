import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { TransactionsEntity } from "../../../db/entities/transactions";

export class TransactionsContextHelper extends AbstractRequestContextHelper {
    public async allBrands() {
        return await this.context.helpers.database.getAll<TransactionsEntity>(
            TransactionsEntity,
        );
    }

    public async addTransaction(proposalId: string, amount: number) {
        return await this.context.helpers.database.add<TransactionsEntity>(
            TransactionsEntity,
            { proposalId, amount },
        );
    }
}

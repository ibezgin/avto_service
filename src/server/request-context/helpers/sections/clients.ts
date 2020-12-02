import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ClientsEntity } from "../../../db/entities/clients";
import { ClientInput } from "gql/types/operation-result-types";
export class ClientsContextHelper extends AbstractRequestContextHelper {
    public async allClients() {
        return (
            await this.context.helpers.database.getAll<ClientsEntity>(
                ClientsEntity,
            )
        ).sort((a, b) => Number(b.createTime) - Number(a.createTime));
    }

    public async addClient(data: ClientInput) {
        return await this.context.helpers.database.add<ClientsEntity>(
            ClientsEntity,
            data,
        );
    }

    public async deleteClient(id: string) {
        return await this.context.helpers.database.delete<ClientsEntity>(
            ClientsEntity,
            id,
        );
    }

    public async updateClient(id: string, data: any) {
        return await this.context.helpers.database.update<ClientsEntity>(
            ClientsEntity,
            id,
            { ...data, id },
        );
    }
}

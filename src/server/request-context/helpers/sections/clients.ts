import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ClientsEntity } from "../../../db/entities/clients";
import { ClientInput } from "../../../../client/service/types/types";
export class ClientsContextHelper extends AbstractRequestContextHelper {
    public async allClients() {
        return await this.context.helpers.database.getAll(ClientsEntity);
    }

    public async addClient(data: ClientInput) {
        return await this.context.helpers.database.add(ClientsEntity, data);
    }

    public async deleteClient(id: string) {
        return await this.context.helpers.database.delete(ClientsEntity, id);
    }

    public async updateClient(id: string, data: ClientInput) {
        return await this.context.helpers.database.update(
            ClientsEntity,
            id,
            data,
        );
    }
}

import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ServiceEntity } from "../../../db/entities/service";
import { ObjectID } from "typeorm";

export class ServiceContextHelper extends AbstractRequestContextHelper {
    public async allServices() {
        return await this.context.helpers.database.getAll(ServiceEntity);
    }

    public async addService(title: string, price: number) {
        return await this.context.helpers.database.add(ServiceEntity, {
            title,
            price,
        });
    }

    public async deleteService(id: string) {
        return await this.context.helpers.database.delete(ServiceEntity, id);
    }

    public async updateService(id: string, title: string, price: number) {
        return await this.context.helpers.database.update<ServiceEntity>(
            ServiceEntity,
            id,
            {
                id,
                title,
                price,
            },
        );
    }
}

import _ from "lodash";
import { getMongoManager } from "typeorm";

import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";

interface IValuesType {
    [key: string]: any;
}

export class DatabaseContextHelper extends AbstractRequestContextHelper {
    private isAuthorized = this.context.authentification.isAuthenticated;

    public async getAll(Entity: any) {
        const manager = getMongoManager();
        const result = await manager.find(Entity);
        return result;
    }

    public async add(Entity: any, values: IValuesType) {
        this.checkAuth();

        const entity = new Entity();
        // eslint-disable-next-line guard-for-in

        // eslint-disable-next-line guard-for-in
        for (const key in values) {
            entity[key] = values[key];
        }
        const manager = getMongoManager();
        const result = await manager.save(entity);
        return !!result.id;
    }
    public async delete(entity: any, id: string) {
        this.checkAuth();

        const manager = getMongoManager();
        const result = await manager.delete(entity, id);
        return _.isEmpty(result);
    }
    public async update(Entity: any, id: string, values: IValuesType) {
        this.checkAuth();

        const manager = getMongoManager();
        const result = await manager.update(Entity, id, values);
        return !result.generatedMaps.length;
    }
    private checkAuth() {
        if (this.isAuthorized) {
            return;
        }
        throw Error("Ошибка авторизации");
    }
}

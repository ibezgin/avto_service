import _ from "lodash";
import { EntitySchema, EntityTarget, getMongoManager } from "typeorm";

import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";

interface IValuesType {
    [key: string]: any;
}

export class DatabaseContextHelper extends AbstractRequestContextHelper {
    private isAuthorized = this.context.authentification.isAuthenticated;

    public async getAll<T>(entity: new () => T) {
        const manager = getMongoManager();
        const result = await manager.find(entity);
        return result;
    }

    public async getById<T>(entity: new () => T, id: string) {
        const manager = getMongoManager();
        const result = await manager.findOne(entity, id);
        return result;
    }

    public async add<T>(entity: new () => T, values: IValuesType) {
        this.checkAuth();
        const newEntity = new entity();
        // eslint-disable-next-line guard-for-in
        for (const key in values) {
            newEntity[key] = values[key];
        }
        const manager = getMongoManager();
        const result = await manager.save(newEntity);
        return !!result;
    }
    public async delete<T>(entity: new () => T, id: string) {
        this.checkAuth();
        const manager = getMongoManager();
        const result = await manager.delete(entity, id);
        return _.isEmpty(result);
    }
    public async update<T>(entity: new () => T, id: string, values: T) {
        this.checkAuth();

        const manager = getMongoManager();
        const result = await manager.update(entity, id, values);
        return !result.generatedMaps.length;
    }
    private checkAuth() {
        if (this.isAuthorized) {
            return;
        }
        throw Error("Ошибка авторизации");
    }
}

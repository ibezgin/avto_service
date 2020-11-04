import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ModelsEntity } from "../../../db/entities/models";

export class ModelsContextHelper extends AbstractRequestContextHelper {
    public async allModels() {
        return await this.context.helpers.database.getAll(ModelsEntity);
    }

    public async addModel(brandId: string, title: string) {
        return await this.context.helpers.database.add(ModelsEntity, {
            brandId,
            title,
        });
    }
    public async deleteModel(id: string) {
        return await this.context.helpers.database.delete(ModelsEntity, id);
    }
    public async updateModel(id: string, brandId: string, title: string) {
        return await this.context.helpers.database.update(ModelsEntity, id, {
            title,
            brandId,
        });
    }
}

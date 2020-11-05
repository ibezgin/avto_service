import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandEntity } from "../../../db/entities/brand";

export class BrandContextHelper extends AbstractRequestContextHelper {
    public async allBrands() {
        return await this.context.helpers.database.getAll(BrandEntity);
    }

    public async addBrand(title: string) {
        return await this.context.helpers.database.add(BrandEntity, { title });
    }

    public async deleteBrand(id: string) {
        return await this.context.helpers.database.delete(BrandEntity, id);
    }

    public async updateBrand(id: string, title: string) {
        return await this.context.helpers.database.update(BrandEntity, id, {
            title,
        });
    }
}

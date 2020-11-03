import { getMongoManager } from "typeorm";
import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandEntity } from "../../../db/entities/brand";
import _ from "lodash";

export class BrandContextHelper extends AbstractRequestContextHelper {
    public async allBrands() {
        const manager = getMongoManager();
        const result = await manager.find(BrandEntity);
        return result;
    }

    public async addBrand(title: string) {
        const brand = new BrandEntity();
        brand.title = title;
        const manager = getMongoManager();
        const result = await manager.save(brand);
        return !!result._id;
    }
    public async deleteBrand(id: string) {
        const manager = getMongoManager();
        const result = await manager.delete(BrandEntity, { _id: id });

        return _.isEmpty(result);
    }
    public async updateBrand(id: string, title: string) {
        const manager = getMongoManager();
        const result = await manager.update(BrandEntity, id, {
            title,
        });
        return !result.generatedMaps.length;
    }
}

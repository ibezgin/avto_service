import { getMongoManager, ObjectID } from "typeorm";
import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { BrandEntity } from "../../../db/entities/brand";

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
}

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
        let brand = new BrandEntity();
        brand = {
            _id: new ObjectID(),
            title,
        };
        const manager = getMongoManager();
        manager.save(brand);
        return true;
    }
}

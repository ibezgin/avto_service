import { getMongoManager } from "typeorm";
import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ProductsEntity } from "../../../db/entities/products";
import _ from "lodash";

export class ProductsContextHelper extends AbstractRequestContextHelper {
    public async allProducts() {
        const manager = getMongoManager();
        const result = await manager.find(ProductsEntity);
        return result;
    }
    public async addProduct(value: any) {
        const manager = getMongoManager();
        const product = new ProductsEntity(value.title, value.price, value.imagePath, value.count, value.isDisplayed);
        manager.save(product).then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    }
    public async updateProduct(value: any) {
        const manager = getMongoManager();
        return manager.update("products", value._id, { ..._.omit(value, ["_id"]) }).then(() => {
            return true;
        }).catch(() => {
            return false;
        });

    }
    public async deleteProduct(id: string) {
        const manager = getMongoManager();
        return manager.delete("products", id).then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    }
}

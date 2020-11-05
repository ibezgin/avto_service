import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { CarPartEntity } from "../../../db/entities/car-part";

export class CarPartContextHelper extends AbstractRequestContextHelper {
    public async allCarParts() {
        return await this.context.helpers.database.getAll(CarPartEntity);
    }

    public async addCarPart(title: string, price: number) {
        return await this.context.helpers.database.add(CarPartEntity, {
            title,
            price,
        });
    }

    public async deleteCarPart(id: string) {
        return await this.context.helpers.database.delete(CarPartEntity, id);
    }

    public async updateCarPart(id: string, title: string, price: number) {
        return await this.context.helpers.database.update(CarPartEntity, id, {
            title,
            price,
        });
    }
}

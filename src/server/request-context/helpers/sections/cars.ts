import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { CarsEntity } from "../../../db/entities/cars";

export class CarsContextHelper extends AbstractRequestContextHelper {
    public async allCars() {
        return await this.context.helpers.database.getAll<CarsEntity>(
            CarsEntity,
        );
    }

    public async addCar(data: any) {
        return await this.context.helpers.database.add<CarsEntity>(
            CarsEntity,
            data,
        );
    }

    public async deleteCar(id: string) {
        return await this.context.helpers.database.delete<CarsEntity>(
            CarsEntity,
            id,
        );
    }

    public async updateCar(id: string, data: any) {
        return await this.context.helpers.database.update<CarsEntity>(
            CarsEntity,
            id,
            data,
        );
    }
}

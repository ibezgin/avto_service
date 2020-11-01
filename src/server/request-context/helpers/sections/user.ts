import { UserEntity } from "../../../db/entities/users";
import { getMongoManager } from "typeorm";
import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";

export class UserContextHelper extends AbstractRequestContextHelper {
    public async getAll() {

        const manager = getMongoManager();
        const result = await manager.find(UserEntity);
        return result;


    }

}

import { getMongoManager, ObjectID } from "typeorm";
import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { RoleEntity } from "../../../db/entities/role";

export class RoleContextHelper extends AbstractRequestContextHelper {
    public async getAll() {
        const manager = getMongoManager();
        const result = await manager.find(RoleEntity);
        return result;
    }

    public async addRole(title: string, permission: any) {
        let role = new RoleEntity();
        role = {
            _id: new ObjectID(),
            title,
            permission,
        };
        const manager = getMongoManager();
        manager.save(role);
        return true;
    }
}

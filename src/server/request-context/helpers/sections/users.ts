import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { UsersEntity } from "../../../db/entities/users";

export class UsersContextHelper extends AbstractRequestContextHelper {
    public async allUsers() {
        return await this.context.helpers.database.getAll(UsersEntity);
    }

    public async addUser(data: any) {
        return await this.context.helpers.database.add(UsersEntity, data);
    }

    public async deleteUser(id: string) {
        return await this.context.helpers.database.delete(UsersEntity, id);
    }

    public async updateUser(id: string, data: any) {
        return await this.context.helpers.database.update(
            UsersEntity,
            id,
            data,
        );
    }
}

import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { UsersEntity } from "../../../db/entities/users";

export class UsersContextHelper extends AbstractRequestContextHelper {
    public async allUsers() {
        return await this.context.helpers.database.getAll(UsersEntity);
    }

    public async addUser(data: any) {
        const allUsers = await this.allUsers();
        const checkUserName = allUsers.find(
            (elem: any) => data.username === elem.username,
        );
        if (!checkUserName) {
            return await this.context.helpers.database.add(UsersEntity, data);
        }
        throw Error("Username уже существует");
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

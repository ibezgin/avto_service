import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { UsersEntity } from "../../../db/entities/users";
import { UserInput } from "../../../../client/service/types/types";
import bcrypt from "bcryptjs";
export class UsersContextHelper extends AbstractRequestContextHelper {
    public async allUsers() {
        const result = await this.context.helpers.database.getAll(UsersEntity);

        return result;
    }

    public async addUser(data: UserInput) {
        const allUsers = await this.allUsers();
        const checkUserName = allUsers.find(
            (elem: any) => data.username === elem.username,
        );
        if (!checkUserName) {
            const password = await bcrypt.hash(data.password, 10);
            // eslint-disable-next-line no-console
            console.log(password);
            return await this.context.helpers.database.add(UsersEntity, {
                ...data,
                password,
            });
        }
        throw Error("Username уже существует");
    }

    public async deleteUser(id: string) {
        return await this.context.helpers.database.delete(UsersEntity, id);
    }

    public async updateUser(id: string, data: any) {
        const user = await this.context.helpers.database.getById<UsersEntity>(
            UsersEntity,
            id,
        );
        return await this.context.helpers.database.update<UsersEntity>(
            UsersEntity,
            id,
            {
                ...user,
                ...data,
                password: data.password
                    ? await bcrypt.hash(data.password, 10)
                    : user.password,
            },
        );
    }
}

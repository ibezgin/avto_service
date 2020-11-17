import { Entity, ObjectIdColumn, ObjectID, Column, Index } from "typeorm";

interface IPermissionType {
    [key: string]: boolean;
}
@Entity({ name: "users" })
export class UsersEntity {
    @ObjectIdColumn()
    public id: ObjectID | string;

    @Column()
    public firstname: string | undefined;

    @Column()
    public lastname: string | undefined;

    @Column()
    @Index("username_unique_idx", { unique: true })
    public username: string;

    @Column()
    public password: string | undefined;

    @Column()
    public position: string | undefined;

    @Column()
    public permission: IPermissionType;
}

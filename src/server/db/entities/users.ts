import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "users" })
export class UsersEntity {
    @ObjectIdColumn()
    public id: ObjectID | undefined;
    @Column()
    public firstname: string | undefined;
    @Column()
    public lastname: string | undefined;
    @Column()
    public username: string | undefined;
    @Column()
    public password: string | undefined;
    @Column()
    public permission: any | undefined;
    @Column()
    public position: string | undefined;
}

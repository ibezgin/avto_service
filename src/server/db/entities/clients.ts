import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "clients" })
export class ClientsEntity {
    @ObjectIdColumn()
    public id!: ObjectID | string;
    @Column()
    public firstName!: string;
    @Column()
    public lastName!: string;
    @Column()
    public phone!: string;
    @Column()
    public createTime!: string;
}

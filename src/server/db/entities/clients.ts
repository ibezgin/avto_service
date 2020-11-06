import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "clients" })
export class ClientsEntity {
    @ObjectIdColumn()
    public id: ObjectID | undefined;
    @Column()
    public firstName: string | undefined;
    @Column()
    public lastName: string | undefined;
    @Column()
    public phone: string | undefined;
}

import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "service" })
export class ServiceEntity {
    @ObjectIdColumn()
    public id!: ObjectID | string;
    @Column()
    public title: string | undefined;
    @Column()
    public price: number | undefined;
}

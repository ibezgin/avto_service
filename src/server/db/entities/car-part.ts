import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "car-part" })
export class CarPartEntity {
    @ObjectIdColumn()
    public id!: ObjectID | string;
    @Column()
    public title!: string;
    @Column()
    public price!: number;
}

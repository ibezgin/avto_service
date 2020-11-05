import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "car-part" })
export class CarPartEntity {
    @ObjectIdColumn()
    public id: ObjectID | undefined;
    @Column()
    public title: string | undefined;
    @Column()
    public price: number | undefined;
}
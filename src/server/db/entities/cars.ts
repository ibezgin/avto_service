import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "cars" })
export class CarsEntity {
    @ObjectIdColumn()
    public id!: ObjectID | string;
    @Column()
    public brandId!: string;
    @Column()
    public modelId!: string;
    @Column()
    public clientId!: string;
    @Column()
    public gosNumber!: string;
    @Column()
    public color!: string;
}

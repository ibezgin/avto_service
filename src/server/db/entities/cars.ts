import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "cars" })
export class CarsEntity {
    @ObjectIdColumn()
    public id: ObjectID | undefined;
    @Column()
    public brandId: string | undefined;
    @Column()
    public modelId: string | undefined;
    @Column()
    public clientId: string | undefined;
    @Column()
    public gosNumber: string | undefined;
    @Column()
    public color: string | undefined;
}

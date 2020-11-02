import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "brand" })
export class BrandEntity {
    @ObjectIdColumn()
    public _id: ObjectID = new ObjectID();
    @Column()
    public title!: string;
}

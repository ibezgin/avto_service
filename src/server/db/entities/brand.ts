import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "brand" })
export class BrandEntity {
    @ObjectIdColumn()
    public _id: ObjectID | undefined;
    @Column()
    public title: string | undefined;
}

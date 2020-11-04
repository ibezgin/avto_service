import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "brand" })
export class BrandEntity {
    @ObjectIdColumn()
    public id: ObjectID | undefined;
    @Column()
    public title: string | undefined;
}
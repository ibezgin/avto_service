import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "brand" })
export class BrandEntity {
    @ObjectIdColumn()
    public id: ObjectID | string | undefined;
    @Column()
    public title: string | undefined;
}

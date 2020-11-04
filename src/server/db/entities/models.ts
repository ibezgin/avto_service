import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "models" })
export class ModelsEntity {
    @ObjectIdColumn()
    public id: ObjectID;
    @Column()
    public brandId: string;
    @Column()
    public title: string | undefined;
}
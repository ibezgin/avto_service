import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "role" })
export class RoleEntity {
    @ObjectIdColumn()
    public _id: ObjectID = new ObjectID();
    @Column()
    public title!: string;
    @Column()
    public permission: any;
}

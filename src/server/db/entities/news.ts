import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "news" })
export class NewsEntity {
    @ObjectIdColumn()
    public _id: ObjectID | undefined;
    @Column()
    public title: string | undefined;
    @Column()
    public content: string | undefined;
}

import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
    @ObjectIdColumn()
    public _id: ObjectID | undefined;

    @Column()
    public email?: string;

    @Column()
    public reddyId?: string;

    @Column()
    public username: string;

    @Column()
    public firstname?: string;

    @Column()
    public lastname?: string;
    constructor(email: string, username: string, firstname: string) {
        this.email = email;
        this.username = username;
        this.firstname = firstname;
    }
}

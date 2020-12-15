import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "transactions" })
export class TransactionsEntity {
    @ObjectIdColumn()
    public id: ObjectID | string;
    @Column()
    public amount: number;
    @Column()
    public proposalId: number;
}

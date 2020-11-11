import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "proposal" })
export class ProposalEntity {
    @ObjectIdColumn()
    public id: ObjectID;
    @Column()
    public createTime: string | undefined;
    @Column()
    public changeTime: string | undefined;
    @Column()
    public status: string | undefined;
    @Column()
    public clientId: string | undefined;
    @Column()
    public carId: string | undefined;
    @Column()
    public userId: string | undefined;
    @Column()
    public proposalReason: string | undefined;
    @Column()
    public technicalInspectionResult: string | undefined;
    @Column()
    public recomendedWork: string | undefined;
    @Column()
    public completedWork: string | undefined;
}

import {
    Entity,
    ObjectIdColumn,
    ObjectID,
    Column,
    // Generated,
    // Index,
} from "typeorm";

@Entity({ name: "proposal" })
export class ProposalEntity {
    @ObjectIdColumn()
    public id: ObjectID | string;
    @Column()
    public proposal_id: number;
    @Column()
    public createTime: string;
    @Column()
    public changeTime: string;
    @Column()
    public status: number;
    @Column()
    public clientId: string;
    @Column()
    public carId: string;
    @Column()
    public userId: string;
    @Column()
    public proposalReason: string | undefined;
    @Column()
    public technicalInspectionResult: string | undefined;
    @Column()
    public recomendedWork: string | undefined;
    @Column()
    public completedWork: string | undefined;
}

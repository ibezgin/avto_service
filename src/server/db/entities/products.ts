import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: "products" })
export class ProductsEntity {
    @ObjectIdColumn()
    public _id: ObjectID | undefined;
    @Column()
    public title: string;
    @Column()
    public price: string;
    @Column()
    public imagePath?: string;
    @Column()
    public count?: number;
    @Column()
    public isDisplayed?: boolean;
    constructor(
        title: string,
        price: string,
        imagePath: string,
        count: number,
        isDisplayed: boolean,
    ) {
        this.title = title;
        this.price = price;
        this.imagePath = imagePath;
        this.count = count;
        this.isDisplayed = isDisplayed;
    }
}

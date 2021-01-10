import mongoose, { Document, Schema } from "mongoose";

// @Entity({ name: "users" })
export interface IUsers extends Document {
    firstname: string;
    lastname: string;
    // @Column()
    // @Index("username_unique_idx", { unique: true })
    username: string;
    password: string;
    position: string;
    permission: string;
}

const schema: Schema = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, unique: true },
    password: String,
    position: String,
    permission: String,
});

export const UsersModel = mongoose.model<IUsers>("users", schema);

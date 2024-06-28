import mongoose, { Schema } from "mongoose";

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    avatar?: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String, optional: true },
});

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;

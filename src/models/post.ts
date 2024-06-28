import mongoose, { Schema } from "mongoose";

export interface PostInterface {
    _id?: string;
    userId: mongoose.Types.ObjectId; // Reference to the User model
    title: string;
    price: number;
    images: string[];
    address: string;
    city: string;
    bedroom: number;
    bathroom: number;
    latitude: string;
    longitude: string;
    type: string;
    property: string;
    createdAt: Date;
}

const PostSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    // images: { type: [String], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, required: true },
    property: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model<PostInterface>("Post", PostSchema);

export default Post;

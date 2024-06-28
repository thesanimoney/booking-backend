import mongoose, { Schema } from 'mongoose';

export interface PostDetailsInterface {
    postId: string;
    desc: string;
    pet: boolean;
    income: number;
    school: number;
    bus: number;
    restoraunt: number;
    createdAt: Date;
}

const PostDetailsSchema = new Schema({
    postId: { type: String, required: true },
    desc: { type: String, required: true },
    pet: { type: Boolean, required: true },
    income: { type: Number, required: true },
    school: { type: Number, required: true },
    bus: { type: Number, required: true },
    restoraunt: { type: Number, required: true },
    size: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const PostDetails = mongoose.model<PostDetailsInterface>('PostDetail', PostDetailsSchema);

export default PostDetails;

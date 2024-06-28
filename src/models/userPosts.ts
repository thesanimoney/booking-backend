import mongoose, { Schema, Document } from "mongoose";

export interface UserPostsInterface extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
}

const UserSavedPostsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

const UserSavedPosts = mongoose.model<UserPostsInterface>("UserSavedPosts", UserSavedPostsSchema);

export default UserSavedPosts;

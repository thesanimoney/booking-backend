import UserSavedPosts from "../../models/userPosts";
import {Response} from "express";

const DeleteSavedPost = async (res: Response, postId: string) => {
    try {
        await UserSavedPosts.findOneAndDelete({postId});
        res.status(200).send('Post unsaved successfully.');
    } catch (e) {
        res.status(500).send(e);
    }
};

export default DeleteSavedPost;
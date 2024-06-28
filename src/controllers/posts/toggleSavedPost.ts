import { Request, Response } from 'express';
import UserSavedPosts from "../../models/userPosts";
import validateUserSavedPosts from "../../services/validation/userSavedPostsValidation";
import deleteSavedPost from "../../services/db/deleteSavedPost";

const toggleSavedPost = async (req: Request, res: Response) => {
    const { user, postId } = req.body;

    try {
        const { error } = validateUserSavedPosts({ userId: user.id, postId });
        if (error) return res.status(400).send(error.details[0].message);

        if (!user.id || !postId) return res.status(400).send('User ID and Post ID are required');

        const isExisting = await UserSavedPosts.findOne({ postId });
        if (isExisting) return await deleteSavedPost(res, postId)

        const newUserSavedPost = new UserSavedPosts({ userId: user.id, postId });
        await newUserSavedPost.save();

        return res.status(201).send('Post saved successfully.');

    } catch (e) {
        return res.status(500).send('Something went wrong');
    }
};

export default toggleSavedPost;

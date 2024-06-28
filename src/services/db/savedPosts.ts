import UserSavedPosts from "../../models/userPosts";
import {Request} from "express";
import {PostInterface} from "../../models/post";
import retreiveId from "../jwt/retreiveId";

const savedPostsRetreival = async (req: Request, token: string) => {
    try {
        if (token) {
            const id = retreiveId(token)
            const savedPosts = await UserSavedPosts.find({userId: id}).lean();
            return savedPosts.map(item => item.postId.toString());
        }
    } catch (e) {
        return ['']
    }
};

export default savedPostsRetreival;

export const savedPostsMapping = async (allPosts: PostInterface[], savedPostIds: string[]) => {
    return allPosts.map(post => ({
        ...post,
        saved: savedPostIds.includes(post._id!.toString())
    }));

}
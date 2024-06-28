import {Request, Response} from 'express';
import UserSavedPosts from "../../models/userPosts";
import Post from "../../models/post";

const getSavedPosts = async (req: Request, res: Response) => {
    const {user} = req.body

    try {
        if (!user) return res.status(404).send('User is invalid or not found');

        const savedPosts = await UserSavedPosts.find({userId: user.id})
        const postIds = savedPosts.map(item => item.postId)

        const posts = await Post.find({_id: {$in: postIds}}).select('-__v');
        const postsWithSavedFlag = posts.map(post =>
            ({
                ...post.toObject(),
                saved: true
            }))

        res.status(200).send(postsWithSavedFlag);

    } catch (e) {
        return res.status(500).send('Something went wrong');
    }
};

export default getSavedPosts;

//get userID
//check if this user id has saved posts
//if yes we should find this posts in getPost method
// extract postId
//then, create saved property for posts that match and set it to true

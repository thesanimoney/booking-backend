import {Request, Response} from 'express';
import Post from "../../models/post";
import PostDetails from "../../models/postDetails";
import User from "../../models/user";

const getPost = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        if (!id) return res.status(404).send("No ID provided");

        const post = await Post.findById(id).select(['-__v']);
        if (!post) return res.status(404).send("No posts found.");

        const postDetails = await PostDetails.findOne({postId: post._id}).select(['-__v', '-_id', '-postId']);
        if (!postDetails) return res.status(404).send("No post details found.")

        const user = await User.findById(post.userId).select(['-__v', '-_id', '-password']);
        if (!user) return res.status(404).send("No user details found.")

        const result = {...post.toObject(), ...postDetails.toObject(), ...user.toObject()};
        return res.status(200).send(result);

    } catch (e) {
        return res.status(500).send(e);
    }
};

export default getPost;

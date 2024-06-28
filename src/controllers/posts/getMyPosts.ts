import { Request, Response } from 'express';
import Post from "../../models/post";

const getMyPosts = async (req: Request, res: Response) => {
    const { user } = req.body;

    try {
        if (!user.id) return res.status(400).send('User ID is required');

        const posts = await Post.find({ userId: user.id }).select(['-__v']).sort('-price');
        if (!posts.length) return res.status(200).send([]);

        const postsWithFlag = posts.map(item =>  {
            return {isPublisher: true, ...item.toObject()}
        })

        return res.status(200).send(postsWithFlag);
    } catch (error) {
        return res.status(500).send('Something went wrong');
    }
};

export default getMyPosts;

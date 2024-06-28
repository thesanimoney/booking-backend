import {Request, Response} from 'express';
import Post from "../../models/post";


const DeletePost = async (req: Request, res: Response) => {
    try {
        const {isPublisher, postId} = req.body

        if (isPublisher) {
            await Post.findByIdAndDelete(postId)
            res.status(200).send('Post deleted successfully')
        }
    }
    catch (error) {
        if (error instanceof Error) res.status(500).send(error.message)
    }
};

export default DeletePost;
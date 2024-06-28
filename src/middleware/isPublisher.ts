import {NextFunction, Request, Response} from "express";
import Post from "../models/post";
import validateId from "../services/validation/idValidation";

const IsPublisher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user} = req.body;
        const {postId} = req.params;

        const {value, error} = validateId(postId)
        if (error) return res.status(400).send(error.message)

        const post = await Post.findById(value);

        if (!post) {
            return res.status(404).send("Post not Found");
        }

        if (post.userId.toString() === user.id) {
            req.body.isPublisher = true;
            req.body.postId = value;

            return next();
        }

        return res.status(403).send("You are not authorized to perform this action");
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};

export default IsPublisher;
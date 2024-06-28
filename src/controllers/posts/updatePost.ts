import { Request, Response } from 'express';
import Post from '../../models/post';
import PostDetails from '../../models/postDetails';
import validatePostDetails from "../../services/validation/postDetailsValidation";
import postValidation from "../../services/validation/postValidation";

const updatePost = async (req: Request, res: Response) => {
    const { isPublisher, postId, formData, formDetails } = req.body;

    if (!isPublisher) return res.status(401).send('You are not allowed to edit this post');

    try {
        const { value: validatedFormData, error: formDataError } = postValidation(formData);
        if (formDataError) return res.status(400).send(formDataError.message);

        const { value: validatedFormDetails, error: formDetailsError } = validatePostDetails(formDetails);
        if (formDetailsError) return res.status(400).send(formDetailsError.message);

        const updatedPost = await Post.findByIdAndUpdate(postId, validatedFormData, { new: true });
        const updatedPostDetails = await PostDetails.findOneAndUpdate({ postId: postId }, validatedFormDetails, { new: true });

        if (!updatedPostDetails) return res.status(404).send('Post details not found');

        if (!updatedPost) return res.status(404).send('Post not found');

        res.status(200).json({post: updatedPost, postDetails: updatedPostDetails});
    } catch (error) {
        res.status(500).send('Error updating post');
    }
};

export default updatePost;

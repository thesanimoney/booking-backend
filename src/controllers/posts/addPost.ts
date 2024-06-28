import { Request, Response } from "express";
import {addPostDetailsAndValidate} from "../../services/db/addPostDetailsService";
import findUser from "../../services/db/user/findUser";
import {validateAndAddPost} from "../../services/db/addPostService";
import handleError from "../../services/error/handleError";

const AddPost = async (req: Request, res: Response) => {
    const { user, formData, formDetails } = req.body;

    try {
        const foundUser = await findUser(user.id, res);
        if (!foundUser) return res.status(400).send('User not found');

        const newPost = await validateAndAddPost(formData, user.id);
        const newPostDetails = await addPostDetailsAndValidate(formDetails, newPost._id)

        const result = { post: newPost, postDetails: newPostDetails };
        return res.status(200).json(result);

    } catch (e) {
        if (e instanceof Error) return handleError(res, e);
    }
};

export default AddPost;

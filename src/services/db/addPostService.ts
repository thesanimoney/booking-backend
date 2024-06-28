import postValidation from "../validation/postValidation";
import Post, {PostInterface} from "../../models/post";
import Joi from "joi";

const addPostService = async (postData: PostInterface, userId: string) => {
    const { value, error } = postValidation(postData);

    if (error) {
        throw new Joi.ValidationError(error.details[0].message, error.details, error._original);
    }
    const newPost = new Post({ userId: userId, ...value });
    return await newPost.save();
};


export const validateAndAddPost = async (formData: PostInterface, userId: string) => {
    try {
        return await addPostService(formData, userId);
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            throw new Error(error.message);
        }
        throw error;
    }
};

export default addPostService;


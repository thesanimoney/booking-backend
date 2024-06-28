import {PostDetailsInterface} from "../../models/postDetails";
import postDetailsValidation from "../validation/postDetailsValidation";
import PostDetails from "../../models/postDetails";
import Joi from "joi";

const addPostDetailsService = async (newObject: PostDetailsInterface, postId: string) => {
        const {value, error} = postDetailsValidation(newObject)
        if (error) throw new Joi.ValidationError(error.details[0].message, error.details, error._original)

        return await new PostDetails({...value, postId: postId}).save()
};

export const addPostDetailsAndValidate = async (formDetails: any, postId: string) => {
    try {
        return await addPostDetailsService(formDetails, postId);
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            throw new Error(error.message);
        }
        throw error;
    }
};
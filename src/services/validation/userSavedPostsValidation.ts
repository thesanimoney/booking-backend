import Joi from "joi";

interface UserPostsValidation {
    userId: string;
    postId: string;
}

const userSavedPostsSchema = Joi.object({
    userId: Joi.string().required().hex().length(24),
    postId: Joi.string().required().hex().length(24),
    _id: Joi.optional(),
    __v: Joi.optional()
});

const validateUserSavedPosts = (object: UserPostsValidation) => {
    return userSavedPostsSchema.validate(object);
}

export default validateUserSavedPosts;

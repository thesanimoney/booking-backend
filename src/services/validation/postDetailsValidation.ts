import Joi from 'joi';

interface PostDetailsValidation {
    postId: string;
    desc: string;
    pet: boolean;
    income: number;
    school: number;
    bus: number;
    restoraunt: number;
}

const postDetailsSchema = Joi.object({
    desc: Joi.string().required(),
    pet: Joi.boolean().required(),
    income: Joi.number().required(),
    school: Joi.number().required(),
    bus: Joi.number().required(),
    restoraunt: Joi.number().required(),
    size: Joi.number().required(),
});

const validatePostDetails = (object: PostDetailsValidation) => {
    return postDetailsSchema.validate(object);
}

export default validatePostDetails;

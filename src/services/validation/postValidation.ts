import Joi from 'joi';
import {PostInterface} from "../../models/post";

const postSchema = Joi.object({
    title: Joi.string().required().min(3).max(255),
    price: Joi.number().required().min(0),
    // images: Joi.array().items(Joi.string().uri()).required().min(1).max(10),
    address: Joi.string().required().min(5).max(255),
    city: Joi.string().required().min(2).max(100),
    bedroom: Joi.number().required().min(1),
    bathroom: Joi.number().required().min(1),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    type: Joi.string().required().min(3).max(50),
    property: Joi.string().required().min(3).max(50),
    createdAt: Joi.date().optional(),
    _id: Joi.optional(),
    __v: Joi.optional(),
});

const postValidation = (object: PostInterface) => {
    return postSchema.validate(object);
}

export default postValidation;
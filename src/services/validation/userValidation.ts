import Joi from "joi";

interface RegisterValidation {
    username: string
    email: string
    password: string
    createdAt: Date
    avatar?: string
}

const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    createdAt: Joi.date().optional(),
    avatar: Joi.string().optional(),
    _id: Joi.optional(),
    __v: Joi.optional(),
})

const userValidation = (object: RegisterValidation) => {
    return userSchema.validate(object);
}

export default userValidation;
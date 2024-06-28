import Joi from "joi";

const idSchema = Joi.string().required().hex().length(24);

const validateId = (id: string) => {
    return idSchema.validate(id);
};

export default validateId;

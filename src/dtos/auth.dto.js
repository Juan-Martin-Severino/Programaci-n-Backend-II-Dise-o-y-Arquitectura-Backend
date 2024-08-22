import Joi, { required } from "joi";

export const authDto = Joi.object(
    {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
)
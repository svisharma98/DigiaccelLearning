import httpStatus from "http-status";
import Joi from "joi";
import { response } from "../utils/resHandler.js";
import { MSHOW } from "../utils/resMessage.js";
import logger from "../config/logger.js";

export const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required()
})

export const validate = (schema) => {
    return (req, res, next) => {

        const { error } = schema.validate(req.body)
        const valid = error == null
        if (valid) { next() }
        else {
            const { details } = error
            const errorsDetail = details.map(i => i.message)
            logger.error(`Joi schema validation failed = ${req.url} ==>> ${errorsDetail}`)
            response(res, httpStatus.BAD_REQUEST, MSHOW, errorsDetail?.[0])
        }
    }
}
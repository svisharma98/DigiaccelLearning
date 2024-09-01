import { SERVERMESSAGE, MSHOW } from "./resMessage.js";
import httpStatus from 'http-status';

export const response = (res, code = httpStatus.OK, status = MSHOW, message = SERVERMESSAGE, payload = {}) => {
    const result = { status, message, payload };
    res.status(code).send(result);
};

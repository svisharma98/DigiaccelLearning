import httpStatus from 'http-status';

import logger from '../config/logger.js';
import { generateToken } from '../utils/auth.js';
import { response } from '../utils/resHandler.js';
import { SUCCESS, MHIDE, MSHOW, ERROR, ALREADYEXISTEMAIL, INVALIDUSER, } from '../utils/resMessage.js';
import { findOne, insertOne, } from "./dbController.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [userData, testData] = await Promise.all([
            findOne("user", { email, password }, { name: 1 }),
            findOne("testSet")
        ]);
        if (!userData) return response(res, httpStatus.INTERNAL_SERVER_ERROR, MSHOW, INVALIDUSER);
        const JWT = generateToken({ userId: userData._id, email: userData.email, name: userData.name })
        const sContentData = {
            userData: userData,
            authToken: JWT,
            testTitle: testData?.title || "",
            testId: testData?._id || "",
            testDescription: testData?.description || ""
        };
        return response(res, httpStatus.OK, MHIDE, SUCCESS, sContentData)
    } catch (error) {
        return response(res, httpStatus.INTERNAL_SERVER_ERROR, MSHOW, ERROR)
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const duplicateEmail = await findOne("user", { email }, { _id: 1 });
        if (duplicateEmail) return response(res, httpStatus.INTERNAL_SERVER_ERROR, MSHOW, ALREADYEXISTEMAIL);
        await insertOne("user", { name, email, password });
        return response(res, httpStatus.OK, MHIDE, SUCCESS, {})
    } catch (error) {
        return response(res, httpStatus.INTERNAL_SERVER_ERROR, MSHOW, ERROR)
    }
};

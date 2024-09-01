import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config/config.js";
import { response } from "./resHandler.js";
import { UNAUTHORIZED, MSHOW } from "./resMessage.js";
import { findOne } from "../controller/dbController.js";
import { ObjectId } from "../config/db.js";
import logger from '../config/logger.js';

export const generateToken = (payload = {}, isExpire = false) => {
   let expire = {};
   if (isExpire) { expire = { expiresIn: config.JWT_EXPIRE_SEC } };

   const token = jwt.sign(payload, config.JWT_SECRET, expire);
   return token;
};

export const verifyToken = async (req, res, next) => {
   try {
      const token = req.header('authToken');
      const decodeToken = jwt.verify(token, config.JWT_SECRET);
      if (decodeToken) {
         const { userId } = decodeToken;
         if (!userId) return response(res, httpStatus.UNAUTHORIZED, MSHOW, UNAUTHORIZED)
         const validUser = await findOne("user", { _id: ObjectId(userId) }, { _id: 1 })
         if (!validUser) return response(res, httpStatus.UNAUTHORIZED, MSHOW, UNAUTHORIZED);
         res.userId = validUser._id;
         next();
      };
   } catch (error) {
      logger.error(`Verify Token Auth User ==>> ${error}`)
      return response(res, httpStatus.UNAUTHORIZED, MSHOW, UNAUTHORIZED)
   }
};
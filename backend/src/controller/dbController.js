import { db } from '../config/db.js';
import logger from "../config/logger.js"

const find = async (modelName, condition = {}, params = {}, sort = {}, skip = 0, limit) => {
    try {
        const model = db[modelName];
        return await model.find(condition, params).sort(sort).skip(skip).limit(limit);
    } catch (error) {
        logger.error(`Error find, ${error}`);
    }
};

const findOne = async (modelName, condition = {}, params = {}) => {
    try {
        const model = db[modelName];
        return await model.findOne(condition, params);
    } catch (error) {
        logger.error(`Error findOne, ${error}`);
    }
};

const insertOne = async (modelName, params = {}) => {
    try {
        const model = db[modelName];
        return await model.create(params);
    } catch (error) {
        logger.error(`Error InsertOne, ${error}`);
    }
};

const updateOne = async (modelName, condition = {}, params = {}) => {
    try {
        const model = db[modelName];
        return await model.updateOne(condition, params);
    } catch (error) {
        logger.error(`Error updateOne, ${error}`);
    }
};

const aggregate = async (modelName, query = []) => {
    try {
        const model = db[modelName];
        return await model.aggregate(query);
    } catch (error) {
        logger.error(`Error updateOne, ${error}`);
    }
};

export {
    find,
    findOne,
    insertOne,
    updateOne,
    aggregate
}
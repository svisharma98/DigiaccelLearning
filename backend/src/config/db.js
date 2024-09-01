import mongoose from "mongoose";
import config from './config.js'
import logger from './logger.js';
import user from "../models/user.model.js";
import testSet from "../models/test.model.js";
import questions from "../models/questions.model.js";
import userAnswer from "../models/userAnswer.model.js";

const connectDB = async () => {
   try {
      await mongoose.connect(config.DATABASE_URI);
      logger.info('MongoDB Connected...🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ');
   } catch (error) {
      logger.error(`MongoDB connection error: ${error}`);
      process.exit(1)
   }
};

const ObjectId = (_id) => {
   return new mongoose.Types.ObjectId(_id);
};

const db = {
   user,
   testSet,
   questions,
   userAnswer
}

export {
   db,
   ObjectId,
   connectDB
};
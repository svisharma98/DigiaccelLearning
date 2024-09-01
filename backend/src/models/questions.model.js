import mongoose, { Schema } from "mongoose";

const questionsSchema = mongoose.Schema(
   {
      testId: { type: Schema.ObjectId, ref: "testSet" },
      question: { type: String },
      answer: { type: String },
      type: { type: String }, // hard, easy
      options: [{
         id: { type: String },
         text: { type: String }
      }],
   },
   { timestamps: true, versionKey: false }
);

const questions = mongoose.model('questions', questionsSchema, 'questions');

export default questions;
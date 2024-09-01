import mongoose, { Schema } from "mongoose";

const userAnswerSchema = mongoose.Schema(
   {
      testId: { type: Schema.ObjectId, ref: "testSet" },
      userId: { type: Schema.ObjectId, ref: "user" },
      questionId: { type: Schema.ObjectId, ref: "questions" },
      isCorrect: { type: Boolean }, // hard, easy
      selectAnswer: { type: String },
   },
   { timestamps: true, versionKey: false }
);

const userAnswer = mongoose.model('userAnswer', userAnswerSchema, 'userAnswer');

export default userAnswer;
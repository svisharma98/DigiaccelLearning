import httpStatus from 'http-status';

import logger from '../config/logger.js';
import { response } from '../utils/resHandler.js';
import { SUCCESS, MHIDE, MSHOW, ERROR, NODATA } from '../utils/resMessage.js';
import { aggregate, find, findOne, insertOne, updateOne } from "./dbController.js"
import { ObjectId } from '../config/db.js';

export const startTest = async (req, res) => {
    try {
        const { testId } = req.query;
        const condition = { testId, type: "easy" };
        const questionRes = await findOne("questions", condition);
        if (!questionRes) return response(res, httpStatus.NOT_FOUND, MHIDE, NODATA);
        return response(res, httpStatus.OK, MHIDE, SUCCESS, questionRes)
    } catch (error) {
        return response(res, httpStatus.INTERNAL_SERVER_ERROR, MSHOW, ERROR)
    }
};

export const nextQuestion = async (req, res) => {
    try {
        const { testId, questionId, selectAnswer } = req.query;
        const userId = res.userId
        const condition = { _id: ObjectId(questionId) };

        const testSetData = await findOne("questions", condition, { answer: 1, type: 1 });
        if (!testSetData) return response(res, httpStatus.NOT_FOUND, MHIDE, NODATA);

        const isCorrect = testSetData.answer === selectAnswer;
        await insertOne("userAnswer",
            {
                testId: ObjectId(testId),
                questionId: ObjectId(questionId),
                userId,
                isCorrect,
                selectAnswer
            }
        );
        const allUserAnswerIds = await find("userAnswer", { testId: ObjectId(testId), userId }, { questionId: 1 })
        const questId = allUserAnswerIds.map((item) => item.questionId);
        const nextCondition = {
            testId,
            _id: { $nin: questId },
            $or: [
                { type: isCorrect ? "hard" : "easy" },
                { type: isCorrect ? "easy" : "hard" }
            ],
        };
        let nextQuestion = await findOne("questions", nextCondition);

        if (!nextQuestion) {
            nextQuestion = {};
            // const getAnswer = await find("userAnswer", { testId: ObjectId(testId), userId }, { isCorrect: 1 });
            // const totalQuestions = getAnswer.length;
            // let totalCorrectAsw = getAnswer.filter((item) => item.isCorrect);
            // nextQuestion.totalQuestions = totalQuestions
            // nextQuestion.correctAnswer = totalQuestions - totalCorrectAsw.length;
            const query = [
                {
                    $match: { testId: ObjectId(testId), userId }
                },
                {
                    $group: {
                        _id: 0,
                        attemptQuestions: { $sum: 1 },
                        correctAnswers: { $sum: { $cond: ["$isCorrect", 1, 0] } }
                    }
                }
            ];
            const userAnsData = await aggregate("userAnswer", query)
            const { attemptQuestions, correctAnswers } = userAnsData[0];
            nextQuestion.attemptQuestions = attemptQuestions
            nextQuestion.correctAnswer = correctAnswers;
        };

        return response(res, httpStatus.OK, MHIDE, SUCCESS, nextQuestion)
    } catch (error) {
        return response(res, httpStatus.INTERNAL_SERVER_ERROR, MSHOW, ERROR)
    }
};

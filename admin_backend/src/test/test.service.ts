import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Que, QueDocument } from '../module/questios.schema';

@Injectable()
export class TestService {
    constructor(
        @InjectModel(Que.name) private queModel: Model<QueDocument>,
    ) { }

    async addQuestion(questionBody: any): Promise<Que> {
        const createdUser = new this.queModel(questionBody);
        return createdUser.save();
    }

    async getAllQuestion(testId: any): Promise<Que[]> {
        return this.queModel.find({ testId }).exec();
    }

    async getQuestion(questionId: any): Promise<Que[]> {
        return this.queModel.find({ _id: questionId }).exec();
    }

    async updateQuestion(questionId: string, questionData: any): Promise<any> {
        // Need to handle condition
        return this.queModel.updateOne({ _id: questionId }, { $set: { ...questionData } });
    }

    async deleteQuestion(questionId: string): Promise<any> {
        return this.queModel.deleteOne({ _id: questionId });
    }
}

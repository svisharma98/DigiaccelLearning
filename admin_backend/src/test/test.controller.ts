import { Body, Controller, UseGuards, Post, Get, Param, Delete, Put, Query } from '@nestjs/common';

import { TestService } from './test.service';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';

@Controller('tests')
export class TestController {
    constructor(private readonly testService: TestService) { }

    @UseGuards(JwtAuthGuard)
    @Post('questions')
    async addQuestion(@Body() questionBody: any) {
        return this.testService.addQuestion(questionBody);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-all-questions')
    async getAllQuestion(@Query('testId') testId: string) {
        return this.testService.getAllQuestion(testId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getQuestions')
    async getQuestion(@Param('questionId') questionId: string) {
        return this.testService.getQuestion(questionId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-questions/:questionId')
    async updateQuestion(
        @Param('questionId') questionId: string,
        @Body() questionData: any,) {
        return this.testService.updateQuestion(questionId, questionData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-question/:questionId')
    async deleteQuestion(@Param('questionId') questionId: string) {
        return this.testService.deleteQuestion(questionId);
    }
}

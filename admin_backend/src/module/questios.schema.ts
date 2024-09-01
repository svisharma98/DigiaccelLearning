import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QueDocument = Que & Document;

@Schema()
export class Que {
    @Prop()
    question: string;

    @Prop()
    testId: string;

    @Prop()
    options: [
        {
            id: string,
            text: string
        }
    ];

    @Prop()
    answer: string;

    @Prop()
    type: string; // hard, easy

    @Prop()
    createdAt: string;
}
export const QueSchema = SchemaFactory.createForClass(Que);


// export const MCQQuestionSchema = new Schema({
//     questionText: { type: String, required: true },
//     options: [
//         {
//             optionText: { type: String, required: true },
//             isCorrect: { type: Boolean, required: true }, // Indicates if the option is the correct answer
//         },
//     ],
//     difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
//     category: { type: String },
//     createdAt: { type: Date, default: Date.now },
// });
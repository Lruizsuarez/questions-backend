import { getDateWithTimeZone } from './../utils/time.utils';
import { IUser } from './auth.models';
import { Document, Model, model, Schema } from 'mongoose';
import { ITopic } from './topic.models';
import { IExam } from './exam.models';
import { IQuestion } from './question.model';

export interface ICourse extends Document {
    title: string
    owner: IUser
    topic: ITopic
    description: string
    exams?: IExam[]
    questions?: IQuestion[]
    students?: IUser[]
    create_date: Date,
    last_update_date: Date
}


const course: Schema = new Schema({
    title: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId
        , ref: 'user',
        required: true
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic',
        required: true
    },
    description: { type: String, required: true },
    exams: [{
        type: Schema.Types.ObjectId,
        ref: 'exam'
    }],
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, { timestamps: { createdAt: 'create_date', updatedAt: 'last_update_date' } });

// TRIGGER FUNCTIONS

course.post('find', (docs: any) => {
    docs.forEach((doc: ICourse) => {
        doc.create_date = getDateWithTimeZone(doc.create_date);
        doc.last_update_date = getDateWithTimeZone(doc.last_update_date);
    })
})

export const Course: Model<ICourse> = model<ICourse>('course', course);

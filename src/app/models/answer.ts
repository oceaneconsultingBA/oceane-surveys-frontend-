import { Question } from "./question";
import { QuestionOption } from "./question-option";

export interface Answer {
    id: number;
    creationDate: Date;
    recipientId: number;
    text: string;
    rating: number;
    question: Question;
    options: QuestionOption[];
}

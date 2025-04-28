import { Question } from "./question";
import { QuestionOption } from "./question-option";

export interface Answer {
    id: number;
    recipientId: number;
    text: string;
    rating: number;
    question: Question;
    options: QuestionOption[];
}

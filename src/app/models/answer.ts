import { Question } from "./question";
import { QuestionOption } from "./question-option";

export interface Answer {
    id: number;
    recipient_id: number;
    text: string;
    rating: number;
    question: Question;
    options: QuestionOption[];
}

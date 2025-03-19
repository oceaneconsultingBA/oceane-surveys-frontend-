import { Question } from "./question";

export interface QuestionOption {
    id: number;
    text: string;
    displayOrder: number;
    question: Question;
}

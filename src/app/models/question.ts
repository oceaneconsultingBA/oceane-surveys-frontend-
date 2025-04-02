import { QuestionOption } from "./question-option";
import { QuestionType } from "./question-type";
import { Survey } from "./survey";

export interface Question {
    id: number;
    text: string;
    type: QuestionType;
    required: boolean;
    displayOrder: number;
    conditionalLogic?: string;
    survey: Survey;
    options: QuestionOption[];
}

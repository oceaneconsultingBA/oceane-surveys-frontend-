import { Question } from "./question";
import { SurveyStatus } from "./survey-status";

export interface Survey {
    id: number;
    title: string;
    description?: string;
    creationDate: Date;
    lastModifiedDate: Date;
    status: SurveyStatus;
    recipientIds: number[];
    questions: Question[];
}

import { Question } from "./question";
import { SurveyStatus } from "./survey-status";

export interface Statistics {
    activeSurveys: number;
    answers: number;
    questions: number;
}

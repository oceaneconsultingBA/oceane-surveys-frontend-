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

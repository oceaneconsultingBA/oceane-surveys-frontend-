export interface Survey {
    id: number;
    title: string;
    description?: string;
    creationDate: Date;
    lastModifiedDate: Date;
    status: SurveyStatus;
    questions: Question[];
}

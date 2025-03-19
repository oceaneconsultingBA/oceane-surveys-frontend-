import { RecipientType } from "./recipient-type";

export interface Recipient {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    type: RecipientType;
}

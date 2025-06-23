import { Recipient } from "./recipient";
import { Survey } from "./survey";

export interface Token {
    id: number;
    token: string;
    survey: Survey;
    recipient: Recipient;
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipient } from "../models/recipient";
import { environment } from "../../environnements/environnement";

@Injectable({ providedIn: 'root' })
export class RecipientService {
  private apiUrl: string = `${environment.apiBaseUrl}/recipients`;

  constructor(private http: HttpClient) { }

  getRecipients(): Observable<Recipient[]> {
    return this.http.get<Recipient[]>(this.apiUrl);
  }

  getRecipient(id: number): Observable<Recipient> {
    return this.http.get<Recipient>(`${this.apiUrl}/${id}`);
  }

  createRecipient(recipient: Recipient): Observable<Recipient> {
    return this.http.post<Recipient>(this.apiUrl, recipient);
  }

  updateRecipient(id: number, recipient: Recipient): Observable<Recipient> {
    return this.http.put<Recipient>(`${this.apiUrl}/${id}`, recipient);
  }

  deleteRecipient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addRecipientToSurvey(recipientId: number, surveyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${recipientId}/surveys/${surveyId}`);
  }

  getRecipientsByIds(ids: number[]): Observable<Recipient[]> {
  const params = ids.map(id => `ids=${id}`).join('&');
  return this.http.get<Recipient[]>(`${this.apiUrl}/by-ids?${params}`);
}

}

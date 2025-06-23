import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environnements/environnement';


@Injectable({ providedIn: 'root' })
export class AnswerService {
  private apiUrl: string = `${environment.apiBaseUrl}/answers`;
  constructor(private http: HttpClient) {}

  saveAnswers(surveyId: number, token: string, answers: {}): Observable<{}> {
    return this.http.post<{}>(`${this.apiUrl}/${surveyId}/${token}`, answers);
  }
  
  getAnswersByDate(periodicity: 'day' | 'month' | 'year'): Observable<{}> {
      return this.http.get<{}>(`${this.apiUrl}/periodicity/${periodicity}`);
    }
  
  getAnswersByDelay(periodicity: 'day' | 'month' | 'year'): Observable<{}> {
      return this.http.get<{}>(`${this.apiUrl}/delay/${periodicity}`);
    }
}
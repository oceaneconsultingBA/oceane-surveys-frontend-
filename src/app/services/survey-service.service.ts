import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../survey';


@Injectable({ providedIn: 'root' })
export class SurveyService {
  private apiUrl = '/api/surveys';

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  getSurvey(id: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.apiUrl}/${id}`);
  }

  createSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(this.apiUrl, survey);
  }

  updateSurvey(id: number, survey: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${this.apiUrl}/${id}`, survey);
  }

  deleteSurvey(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
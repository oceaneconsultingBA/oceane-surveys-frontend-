import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { environment } from '../../environnements/environnement';
import { Statistics } from '../models/statistics';


@Injectable({ providedIn: 'root' })
export class SurveyService {
  private apiUrl: string = `${environment.apiBaseUrl}/surveys`;
  constructor(private http: HttpClient) {}

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.apiUrl);
  }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.apiUrl}/statistics`);
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
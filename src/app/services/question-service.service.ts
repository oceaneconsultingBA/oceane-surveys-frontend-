@Injectable({ providedIn: 'root' })
export class QuestionService {
  private apiUrl = '/api/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

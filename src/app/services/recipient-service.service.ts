@Injectable({ providedIn: 'root' })
export class RecipientService {
  private apiUrl = '/api/recipients';

  constructor(private http: HttpClient) {}

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
}

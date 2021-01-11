import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../schema/mailbox-message';

@Injectable({
  providedIn: 'root',
})
export class MailboxService {
  constructor(private http: HttpClient) {}

  getMessages(userId: string): Observable<Message[]> {
    // const URL = environment.API_URL + Slugs.MAILBOX;
    // const ENDPOINT = URL.replace('{id}',userId);
    const URL = 'assets/mocks/mailbox.json';
    return this.http.get<Message[]>(URL);
  }
}

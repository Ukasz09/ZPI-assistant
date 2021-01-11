import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../schema/mailbox-message';
import { Slugs } from './slugs';

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

  updateMessage(userId: string, msgId: string): Observable<any> {
    // const URL = environment.API_URL + Slugs.UPDATE_MESSAGE;
    // const ENDPOINT = URL.replace('{userId}', userId).replace('{msgId}', msgId);
    // return this.http.get<Message[]>(ENDPOINT);
    return new BehaviorSubject({});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../schema/mailbox-message';

@Injectable({
  providedIn: 'root',
})
export class MailboxService {
  constructor(private http: HttpClient) {}

  getMessages(userEmail: string): Observable<Message[]> {
    // const rawSlug = '/mailbox?email={email}';
    // const slug = rawSlug.replace('{email}', userEmail);
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/mailbox.json';
    return this.http.get<Message[]>(url);
  }

  markMessageAsReaded(userEmail: string, messageId: string): Observable<any> {
    // const rawSlug = '/mailbox/markReaded?email={email}&messageId={messageId}';
    // const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    // const url = environment.API_URL + slug;
    // return this.http.put<Message[]>(url, {});
    return new BehaviorSubject({});
  }

  deleteMessage(userEmail: string, messageId: string): Observable<any> {
    // const rawSlug = '/mailbox?email={email}&messageId={messageId}';
    // const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    // const url = environment.API_URL + slug;
    // return this.http.delete<Message[]>(url);

    return new BehaviorSubject({});
  }
}

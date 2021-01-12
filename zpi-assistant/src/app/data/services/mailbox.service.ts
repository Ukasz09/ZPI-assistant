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

  getMessages(userId: string): Observable<Message[]> {
    // const rawSlug = '/mailbox?id={id}';
    // const slug = rawSlug.replace('{id}', userId);
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/mailbox.json';
    return this.http.get<Message[]>(url);
  }

  updateMessage(userId: string, msgId: string): Observable<any> {
    const rawSlug = '/mailbox?userId={useId}&msgId={msgId}';
    const slug = rawSlug.replace('{userId}', userId).replace('{msgId}', msgId);
    const url = environment.API_URL + slug;
    // return this.http.get<Message[]>(url);
    return new BehaviorSubject({});
  }

  deleteMessage(userId: string, msgId: string): Observable<any> {
    // const rawSlug = '/mailbox?userId={useId}&msgId={msgId}';
    // const slug = rawSlug.replace('{userId}', userId).replace('{msgId}', msgId);
    // const url = environment.API_URL + slug;
    // return this.http.delete<Message[]>(url);

    return new BehaviorSubject({});
  }
}

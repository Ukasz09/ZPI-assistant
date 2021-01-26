import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../schema/mailbox-message';

@Injectable({
  providedIn: 'root',
})
export class MailboxService {
  constructor(private http: HttpClient) {}

  /**
   * Request all messages for user with given email
   *
   * @param userEmail Email of user whose messages requested
   * @returns An `Observable` of `Message` array
   */
  getMessages(userEmail: string): Observable<Message[]> {
    const rawSlug = '/mailbox?email={email}';
    const slug = rawSlug.replace('{email}', userEmail);
    const url = environment.API_URL + slug;
    return this.http.get<Message[]>(url).pipe(map((msgs) => msgs.sort((a, b) => +b.id - +a.id)));
  }

  /**
   * Request to mark message as readed
   *
   * @param userEmail Email of user to whose contain message
   * @param messageId Id of messsage which needs to be marked as readed
   * @returns An 'Observable` of empty object
   */
  markMessageAsReaded(userEmail: string, messageId: string): Observable<{}> {
    const rawSlug = '/mailbox/markReaded?email={email}&messageId={messageId}';
    const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    const url = environment.API_URL + slug;
    return this.http.put<Message[]>(url, {});
  }

  /**
   * Request to remove message with given Id for user with given email
   *
   * @param userEmail Email of user whose message need to be deleted
   * @param messageId Id of message to delete
   *
   */
  deleteMessage(userEmail: string, messageId: string): Observable<any> {
    const rawSlug = '/mailbox?email={email}&messageId={messageId}';
    const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    const url = environment.API_URL + slug;
    return this.http.delete<Message[]>(url);
  }
}

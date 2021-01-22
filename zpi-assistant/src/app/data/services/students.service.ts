import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentSchema } from '../schema/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  /**
   * Request all students data
   *
   * @returns An `Observable` of fetched `StudentSchema` array
   */
  getStudents(): Observable<StudentSchema[]> {
    const rawSlug = '/students';
    const url = environment.API_URL + rawSlug;
    return this.http.get<StudentSchema[]>(url);
  }

  /**
   * Request student's data with given email
   *
   * @param studentEmail Email of student whose data need to be fetched
   * @returns An `Observable` of `StudentSchema`
   */
  getStudent(studentEmail: string): Observable<StudentSchema> {
    const rawSlug = '/students/{email}/';
    const slug = rawSlug.replace('{email}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.get<StudentSchema>(url);
  }

  /**
   * Request to leave team by user with given email
   *
   * @param studentEmail Email of student whose need to leave team
   * @returns An `Observable` of empty object
   */
  leaveTeam(studentEmail: string): Observable<{}> {
    const rawSlug = '/students/leaveTeam?email={email}';
    const slug = rawSlug.replace('{email}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.put(url, {});
  }

  /**
   * Accept invitation to become team member for user with given email
   *
   * @param userEmail Email of student whose accept invitation
   * @param messageId Id of invitation message
   * @returns An `Observable` of POJO containing id of created team
   */
  acceptInvitation(userEmail: string, messageId: string): Observable<{ teamId: string }> {
    const rawSlug = '/mailbox/accept?email={email}&messageId={messageId}';
    const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    const url = environment.API_URL + slug;
    return this.http.put<{ teamId: string }>(url, {});
  }
}

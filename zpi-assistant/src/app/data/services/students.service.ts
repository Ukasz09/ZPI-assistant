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

  getStudents(): Observable<StudentSchema[]> {
    const rawSlug = '/students';
    const url = environment.API_URL + rawSlug;
    return this.http.get<StudentSchema[]>(url);
  }

  getStudent(userEmail: string): Observable<StudentSchema> {
    const rawSlug = '/students/{email}/';
    const slug = rawSlug.replace('{email}', userEmail);
    const url = environment.API_URL + slug;
    return this.http.get<StudentSchema>(url);
  }

  leaveTeam(studentEmail: string): Observable<any> {
    const rawSlug = '/students/leaveTeam?email={email}';
    const slug = rawSlug.replace('{email}', studentEmail);
    const url = environment.API_URL + slug;
    return this.http.put(url, {});
  }

  //TODO: do e2e check
  acceptInvitation(userEmail: string, messageId: string): Observable<any> {
    const rawSlug = '/mailbox/accept?email={email}&messageId={messageId}';
    const slug = rawSlug.replace('{email}', userEmail).replace('{messageId}', messageId);
    const url = environment.API_URL + slug;
    return this.http.put(url, {});
  }
}

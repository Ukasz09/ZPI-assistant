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
    // const rawSlug = '/students';
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/students.json';
    return this.http.get<StudentSchema[]>(url);
  }

  getStudent(studentIndex: string): Observable<StudentSchema> {
    // const rawSlug = '/students/{id}';
    // const slug = rawSlug.replace('{id}', studentIndex);
    // const url = environment.API_URL + rawSlug;
    const url = 'assets/mocks/student.json';
    return this.http.get<StudentSchema>(url);
  }

  leaveTeam(studentIndex: string): Observable<any> {
    // const rawSlug = '/students/leaveTeam?id={id}';
    // const slug = rawSlug.replace('{id}', studentIndex);
    // const url = environment.API_URL + rawSlug;
    return new BehaviorSubject<any>({});
  }

  acceptInvitation(studentId: string, messageId: string): Observable<any> {
    // const rawSlug = '/mailbox/accept?studentId={studentId}&messageId={messageId}';
    // const slug = rawSlug.replace('{studentId', studentId).replace('{messageId}', messageId);
    // const url = environment.API_URL + slug;
    // this.http.post(url, {});
    return new BehaviorSubject<any>({ teamId: 'Z03' });
  }
}

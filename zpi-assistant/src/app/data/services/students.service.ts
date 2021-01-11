import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentSchema } from '../schema/student';
import { Slugs } from './slugs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentSchema[]> {
    // const URL = environment.API_URL + Slugs.STUDENTS;
    const URL = 'assets/mocks/students.json';
    return this.http.get<StudentSchema[]>(URL);
  }

  getStudent(studentIndex: string): Observable<StudentSchema> {
    // const URL = environment.API_URL + Slugs.STUDENT;
    // const ENDPOINT = URL.replace('{id}',studentIndex);
    const URL = 'assets/mocks/student.json';
    return this.http.get<StudentSchema>(URL);
  }

  leaveTeam(studentIndex: string): Observable<any> {
    // const URL = environment.API_URL + Slugs.LEAVE_TEAM;
    // const ENDPOINT = URL.replace('{id}',studentIndex);
    return new BehaviorSubject<any>({});
  }
}
